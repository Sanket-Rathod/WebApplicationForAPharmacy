import bodyParser from 'body-parser'
import express from 'express'
import sql from 'mssql'
import 'msnodesqlv8'
import cors from 'cors'


const app = express();
const port = 3001
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
var result;
var request;
var query;
var con;
const main = async() =>{
    con = await new sql.ConnectionPool({
        database: "master",
        server: "SUNYLOANER2020-",
        driver: "msnodesqlv8",
        user: 'sa',
        password: '12345678',
        options: {
            trustServerCertificate: true,
          trustedConnection: true
        }
    });
    
    await con.connect();
    console.log("conencted");
    request = new sql.Request(con);
    
    query = `select * from orders`;
    
    result = await request.query(query);
    
    // console.dir(result);
}

main();



app.post('/createOrder', (req,res)=>{
    request = new sql.Request(con);
    console.log(req.body);
    const orderID = req.body.orderId;
    const medicines = req.body.medicines;
    const amount = req.body.amount;
    const discount = req.body.discount;
    const username = req.body.username;
    
    request.query(request.template`INSERT into orders values (${medicines},${amount},${discount},${username});`,
    (err,result)=>{
        if(err)console.log(err);
        else {
            res.send("Values inserted");
        }
    });
})

app.delete('/deleteOrder',(req,res)=>{
    request = new sql.Request(con);
    console.log(req.body);
    const orderID = req.body.orderId;
    request.query(request.template`Delete from Orders where OrderID = ${orderID};`,
    (err,result)=>{
        if(err)console.log(err);
        else {
            res.send("Values Deleted");
        }
    });
});

app.put('/updateOrder', (req,res)=>{
    request = new sql.Request(con);
    console.log(req.body);
    const orderID = req.body.orderId;
    const medicines = req.body.medicines;
    const amount = req.body.amount;
    const discount = req.body.discount;
    const username = req.body.username;
    
    request.query(request.template`UPDATE orders set medicines = ${medicines}, amount=${amount},
     discount=${discount}, username = ${username} where orderID = ${orderID};`,
    (err,result)=>{
        if(err)console.log(err);
        else {
            res.send("Values Updated");
        }
    });
})

app.get('/getOrder', (req,res)=>{
    request = new sql.Request(con);
    console.log(req.query);
    const orderID = req.query.orderId;
    
    
    request.query(request.template`select * from orders where orderID =${orderID}`,
    (err,result)=>{
        if(err)console.log(err);
        else {
            res.send(result);
        }
    });
})

app.get('/users',(req,res)=>{

    res.send(result.recordsets);
})

app.listen(port, () => console.log(`Server is running on port : http://localhost:${port}`))