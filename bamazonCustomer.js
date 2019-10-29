var mysql = require('mysql');
var inquirer = require('inquirer');

var product;
var unit ;
var stockQuantity;
var price ;


inquirer.prompt([{
  type:"input",
  message:"Enter a product number: ",
  name: 'product'
},{
  type:'input',
  message: 'how many units do you want ',
  name:'units'
}
]).then(results =>{
  product = parseInt(results.product);
  unit = parseFloat(results.units);
  

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'bamazon'
  });

connection.connect(function (err) {
  if(err) throw err;
 
connection.query(`SELECT * FROM products WHERE item_id = ${product}`, function (err,result) { 
  if(err) throw err;
  stockQuantity = result[0].stock_quantity;
  price = parseFloat(result[0].price);  
  if(result.length === 0){
    console.log('No product under this number');   
    }
    
  });

  if(stockQuantity <= 0 ){
    console.log('Insufficient quantity!');
  }else{
    setTimeout(function(){
      var total = price * unit;   
      console.log(`Total: ${total}`);
      
      connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${unit} WHERE item_id = ${product} `,function(err,result){
        if(err) throw err;
        connection.end();
      });

    },300);
    
    } 
    
});



  });


    

  