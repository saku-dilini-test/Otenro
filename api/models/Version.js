/**
 * Created by udeshikaperera on 03/11/2016.
 *
 * @Description : Model uses to keep the version details of the templates
 */

module.exports = {
    attributes: {
        number:{
            type:'string'
        },
        description:{
            type:'string'
        },
        template:{
            model:'template'
        }
    }
};