import React, { useEffect, ChangeEvent, ClipboardEvent } from "react";
import {
    useForm,
    FormProvider,
    useFormContext,
    Mode,
    UseFormReturn,
    FieldError,
    UseFormRegisterReturn,
    ValidationRule,
} from "react-hook-form";

interface FormProps {
    mode?: Mode;
    reValidateMode?: Exclude<Mode, "onTouched" | "all">;
    criteriaMode?: "firstError" | "all";
    onSubmit: (e: Record<string, string>, form: UseFormReturn) => void;
    className?: string;
    model?: Record<string, string>;
    children?: React.ReactNode;
}

interface FormInputProps {
    name: string;
    label?: string;
    required?: boolean;
    type?: string;
    pattern?: ValidationRule<RegExp>;
    minLength?: number;
    maxLength?: number;
    onChange?: (
        e: ChangeEvent<HTMLInputElement>,
        form: UseFormReturn
    ) => void;
    onPaste?: (
        e: ClipboardEvent<HTMLInputElement>,
        form: UseFormReturn
    ) => void;
    children?: (props: FormInputFuncProps) => React.ReactNode;
}

export interface FormInputFuncProps extends UseFormRegisterReturn {
    type: string | undefined;
    label: string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: FieldError | any;
}

export function Form({
    model,
    onSubmit,
    children,
    className,
    mode = "onSubmit",
    criteriaMode = "all",
    reValidateMode = "onChange",
}: FormProps) {
    const form = useForm({
        mode,
        reValidateMode,
        defaultValues: model,
        criteriaMode,
    });

    useEffect(() => {
        if (model) {
            Object.entries(model).forEach(([k, v]) => {
                form.setValue(k, v);
            });
        } else {
            form.reset();
        }
    }, [form, model]);

    return (
        <FormProvider {...form}>
            {typeof children === "function" ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (children as unknown as any)(form)
            ) : (
                <form
                    className={className}
                    noValidate
                    onSubmit={form.handleSubmit((e) => onSubmit(e, form))}
                >
                    {children}
                </form>
            )}
        </FormProvider>
    );
}

export function FormField({
    name,
    label,
    required,
    type,
    pattern,
    minLength,
    maxLength,
    children,
    onChange,
    onPaste,
}: FormInputProps) {
    const form = useFormContext();

    let patternRegex =
        type === "email" ? /^([^\s@])+@(([^\s@.])+\.)+([^\s.]{2,})+$/i : undefined;
    if (pattern) {
        patternRegex = pattern instanceof RegExp ? pattern : pattern.value;
    }

    const inputProps = form.register(name, {
        required: required ? `${label || name} field is required` : false,
        pattern: patternRegex && {
            value: patternRegex,
            message:
                type === "email"
                    ? "Invalid email address"
                    : (pattern as { message: string })?.message || "Invalid format",
        },
        minLength: minLength
            ? {
                value: minLength,
                message: `${label || name
                    } should be at least ${minLength} character long`,
            }
            : undefined,
        maxLength: maxLength
            ? {
                value: maxLength,
                message: `${label || name
                    } should be less than ${maxLength} character long`,
            }
            : undefined,
    });

    if (onChange) {
        const inputOnChange = inputProps.onChange;

        inputProps.onChange = (e) => {
            onChange(e as unknown as never, form);
            return inputOnChange(e);
        };
    }

    useEffect(() => {
        if (onPaste) {
            const inputElement = document.querySelector(`[name="${name}"]`) as HTMLInputElement | null;
            if (inputElement) {
                const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
                    onPaste(e, form);
                };

                inputElement.addEventListener("paste", handlePaste as unknown as EventListener);

                return () => {
                    inputElement.removeEventListener("paste", handlePaste as unknown as EventListener);
                };
            }
        }
    }, [name, onPaste, form]);

    if (typeof children === "function") {
        return children({
            ...inputProps,
            type,
            label,
            errors: form.formState.errors[name],
        });
    }

    return children as React.ReactNode;
}