import jwt from 'jsonwebtoken';

export const verfiytoken = async(req,res,next)=>{
    
    try{ 
        var token = req.header("authorization");
         let jwtsecretkey = 'shivam';
         if (!token){
             res.send({
                 status :404,
                 message:"token not valid",
               
             })
         }
         const decode = jwt.verify(token,jwtsecretkey);
         console.log(decode)
         next();
        
        
        }
        catch(e){
          return res.send({
              status:false, message:"token not verified",result:e
          })
        }
   

}