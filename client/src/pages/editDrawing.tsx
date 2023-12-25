import DrawingBoard from "../Components/Drawing/DrawingBoard";

const EditDrawing = () => {
    return (
        <div>
            <DrawingBoard drawing={{
                title: "Hello world", description: "hello", created_at: new Date(), updated_at: new Date(), 
                elements: [
                    {
                        "type": "rectangle",
                        "properties": {
                            "coordinates": [
                                [
                                    {
                                        "x": 242,
                                        "y": 80
                                    },
                                    {
                                        "x": 333,
                                        "y": 180
                                    }
                                ]
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "diamond",
                        "properties": {
                            "coordinates": [
                                [
                                    {
                                        "x": 350,
                                        "y": 85.5
                                    },
                                    {
                                        "x": 423,
                                        "y": 176
                                    }
                                ]
                            ],
                            "color": "#c22424",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "circle",
                        "properties": {
                            "coordinates": [
                                [
                                    {
                                        "x": 540,
                                        "y": 117.5
                                    },
                                    {
                                        "x": 540,
                                        "y": 117.5
                                    }
                                ],
                                [
                                    {
                                        "x": 432.5,
                                        "y": 92.5
                                    },
                                    {
                                        "x": 450,
                                        "y": 97.5
                                    }
                                ]
                            ],
                            "color": "#430a0a",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "line",
                        "properties": {
                            "coordinates": [
                                [
                                    {
                                        "x": 476,
                                        "y": 75
                                    },
                                    {
                                        "x": 479,
                                        "y": 173
                                    }
                                ],
                                [
                                    {
                                        "x": 353,
                                        "y": 189.5
                                    },
                                    {
                                        "x": 476.5,
                                        "y": 183
                                    }
                                ],
                                [
                                    {
                                        "x": 455,
                                        "y": 126.5
                                    },
                                    {
                                        "x": 429,
                                        "y": 174
                                    }
                                ]
                            ],
                            "color": "#0f9ec2",
                            "thickness": 1
                        }
                    }
                ]
            }} />
        </div>
    );
};

export default EditDrawing;