const connection=require('../../model/db');

const totalPartners=async(req,res)=>{
    try{
    let query=`select count(*) as total_partners from partners`;

    const [result]=await connection.query(query);
    return res.status(200).send(result);
    }catch(error){
        console.log("total partners error",error);
        return res.status(500).send({
            success:false,
            message:error.message
        })
    }
}

module.exports=totalPartners;