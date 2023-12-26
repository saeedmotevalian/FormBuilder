class ExceptionHandler {

    response(error) {
        tracing.error(error);
        switch (error.name) {
            case 'SequelizeForeignKeyConstraintError':
                return {
                    type: 'reference',
                    referencedTable: error.parent.table
                };
            default:
                return error;
        }
    }
}

module.exports = new ExceptionHandler();