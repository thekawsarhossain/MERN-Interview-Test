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
                                {
                                    "x": 225.5,
                                    "y": 90.5
                                },
                                {
                                    "x": 307,
                                    "y": 184
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "diamond",
                        "properties": {
                            "coordinates": [
                                {
                                    "x": 328.5,
                                    "y": 90.5
                                },
                                {
                                    "x": 379,
                                    "y": 181.5
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "circle",
                        "properties": {
                            "coordinates": [
                                {
                                    "x": 404,
                                    "y": 91.5
                                },
                                {
                                    "x": 423,
                                    "y": 109
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "line",
                        "properties": {
                            "coordinates": [
                                {
                                    "x": 461,
                                    "y": 92
                                },
                                {
                                    "x": 395.5,
                                    "y": 176.5
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "arrow",
                        "properties": {
                            "coordinates": [
                                {
                                    "x": 483.5,
                                    "y": 77
                                },
                                {
                                    "x": 475,
                                    "y": 183.5
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "pencil",
                        "properties": {
                            "coordinates": [
                                {
                                    "x": 0,
                                    "y": 0
                                },
                                {
                                    "x": 668.5,
                                    "y": 177.5
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "pencil",
                        "properties": {
                            "coordinates": [
                                {
                                    "x": 0,
                                    "y": 0
                                },
                                {
                                    "x": 726.5,
                                    "y": 98
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "eraser",
                        "properties": {
                            "coordinates": [
                                {
                                    "x": 0,
                                    "y": 0
                                },
                                {
                                    "x": 652,
                                    "y": 112
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "pencil",
                        "properties": {
                            "coordinates": [
                                {
                                    "x": 0,
                                    "y": 0
                                },
                                {
                                    "x": 530,
                                    "y": 164
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    },
                    {
                        "type": "pencil",
                        "properties": {
                            "coordinates": [
                                {
                                    "x": 0,
                                    "y": 0
                                },
                                {
                                    "x": 619.5,
                                    "y": 177
                                }
                            ],
                            "color": "#000000",
                            "thickness": 1
                        }
                    }
                ]
            }} />
        </div>
    );
};

export default EditDrawing;