const config = {
    staging:{
        DB:{
            host:"172.10.1.3",
            portno:27017,
            dbname:"shivamrawat",
            username:"shivamrawat",
            password:"shivamrawat34"
        },

        email:{
            emailId:"shivamraj6370@gmail.com",
            password:"daqfktbgfwuyxszq",
            host:"smtp.gmail.com",
            port:465,
        },
        port_no:7889
    }
}
export const get = (env) =>{
    return config [env];
}