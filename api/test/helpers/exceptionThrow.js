exports.mockErrorMethod = (schema) => {
    schema["create"] = () => {
        throw new Error();
    };
    schema["findAll"] = () => {
        throw new Error();
    };
    schema["findOne"] = () => {
        throw new Error();
    };
    schema["update"] = () => {
        throw new Error();
    };
    schema["destroy"] = () => {
        throw new Error();
    };
}