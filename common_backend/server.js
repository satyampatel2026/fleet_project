require('dotenv').config();
const express= require('express');
const cookieParser = require("cookie-parser");
const cors=require('cors');
const path = require("path");
const port=process.env.SERVER_PORT || 5000;
const userRouter=require('./admin/routes/userRoute');
const departmentRouter=require('./admin/routes/departmentRoute');
const rolesRouter=require('./admin/routes/userRoleRoute');
const partnerRouter=require('./admin/routes/partnerRoute');
const adminPartnerKycRouter=require('./admin/routes/partnerkycRoute');
const authRouter=require('./admin/routes/authRoute')
const partnerAuthRouter=require('./partner/routes/partnerAuthRoute');
const partnerKycRouter = require('./partner/routes/partnerKycRoute');
const dashboardRouter= require('./admin/routes/dashboardRoute');

const app= express();
app.use( cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
    "/myfiles",
    express.static(path.join(__dirname, "myfiles"))
);
app.use('/',userRouter);
app.use('/',dashboardRouter);
app.use('/',departmentRouter);
app.use('/',partnerRouter);
app.use('/',adminPartnerKycRouter);
app.use('/',rolesRouter);
app.use('/',authRouter);
app.use('/',partnerAuthRouter);
app.use('/api', partnerKycRouter);


app.listen(port, ()=>{
    console.log(`server is runing on port ${port}`);
});


