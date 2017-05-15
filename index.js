#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const _ = require("lowdown-sinperhezine");

/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */

var output={};
var males =[];
var females=[];
var transgenders=[];
var oldestCustomer = {};
var youngestCustomer ={};
var customerTags ={};
var customerNameBeginnging={};
var customerFriendBeginnging={};
var customerFriends={};
var balanceTotal=0;
var balanaceCount=0;
var balanaceAverage=0;

_.each(customers,function(value,pos,collection){
    _.each(value,function(value1,pos1,collection1){
        //console.log(pos1);
        if(value1==='male')
            males.push(1);
        if(value1==='female')
            females.push(1);
        if(value1==='transgender')
            transgenders.push(1);
        if(oldestCustomer['age']=== undefined){
            oldestCustomer['name']= collection1['name'];
            oldestCustomer['age']= collection1['age'];
        }
        else if(oldestCustomer['age']< collection1['age']){
            oldestCustomer['name']= collection1['name'];
            oldestCustomer['age']= collection1['age'];
        }
        if(youngestCustomer['age']=== undefined){
            youngestCustomer['name']= collection1['name'];
            youngestCustomer['age']= collection1['age'];
        }
        else if(youngestCustomer['age']> collection1['age']){
            youngestCustomer['name']= collection1['name'];
            youngestCustomer['age']= collection1['age'];
        }
        if(pos1==='balance'){
            //console.log("value1: "+value1.replace('$',''));
            balanceTotal+=parseFloat((value1.replace('$','')).replace(',',''));
            //console.log("balanceTotal: "+balanceTotal);
            
            balanaceCount++;
        }
    })
});

balanaceAverage = (balanceTotal/balanaceCount);

males = _.reduce(males,function(output,value,pos){
     return output+value;
},0);
females = _.reduce(females,function(output,value,pos){
     return output+value;
},0);
transgenders = _.reduce(transgenders,function(output,value,pos){
     return output+value;
},0);
 
function NameBeginnging(friends){
    if(friends == false){
        _.each(customers,function(value,pos,collection){
           _.each(value,function(value1, pos1, collection1) {
              // console.log(pos1);
               if(pos1=="name"){
                  if( customerNameBeginnging[value1.charAt(0)] === undefined)
                    customerNameBeginnging[value1.charAt(0)] =1;
                  else if( customerNameBeginnging[value1.charAt(0)]!== undefined)
                    customerNameBeginnging[value1.charAt(0)]+=1;
               }
           }); 
        });
    }
    else{
       // each loop to go throught customer json
        _.each(customers,function(value,pos,collection){
            //each loop to go throught the customers int he json object
          _.each(value,function(value1, pos1, collection1) {
                if(pos1 ==="friends"){
                    _.each(value1,function(value2,pos2,collection2){
                        _.each(value2,function(value3,pos3,collection3){
                            if(pos3==="name")
                                if( customerFriendBeginnging[value3.charAt(0)] === undefined)
                                    customerFriendBeginnging[value3.charAt(0)] =1;
                                else if( customerFriendBeginnging[value3.charAt(0)]!== undefined)
                                    customerFriendBeginnging[value3.charAt(0)]+=1;
                        })
                    });
                customerFriends[value1]
            }
          }); 
        });
    }
}

function getFriendsList(){
                var outputName ='';
        _.each(customers,function(value,pos,collection){
            //each loop to go throught the customers int he json object
          _.each(value,function(value1, pos1, collection1) {
               // console.log(pos1);
                if(pos1==='name'){
                   // console.log(value1);
                    outputName = value1.toString();
                    console.log(outputName);
                }
                if(pos1 ==="friends"){
                    console.log(value1);
                    console.log(outputName);
                    console.log(customerFriends);
                    customerFriends[outputName] =value1;
            }
          }); 
        });

}

function updateTagCount(){
    var output ={};
    var topThree ={};
    var numberOne =[];
    var numberTwo =[];
    var numberThree =[];
    _.each(customers,function(customer,pos,collection){
       _.each(customer,function(tags,pos1,collection1){
           if(pos1 === 'tags')
                _.each(tags,function(value,pos2,collection2){
                    if( output[value] === undefined)
                        output[value] =1;
                    else if( output[value]!== undefined)
                        output[value]+=1;
           });
       });
    });
    _.each(output,function(output,pos1,collection){
       if(output ===1)
            numberOne.push({pos1,output});
       if(output ===2)
            numberTwo.push({pos1,output});
       if(output ===3)
            numberThree.push({pos1,output});
    });
    topThree[1] =numberOne;
    topThree[2] =numberTwo;
    topThree[3] = numberThree;
    customerTags = topThree;
} 
output['males'] = males;
output['females'] = females;
output['transgenders'] = transgenders;



// Find the number of males.
console.log(males);
// Find the number of females.
console.log(females);

// Find the name and age of the oldest customer.
// Find the name and age of the youngest customer.
 console.log("Oldest Customer");
 console.log(oldestCustomer);
 console.log("Youngest Customer");
 console.log(youngestCustomer);
// Find the average balance of all the customers.
 console.log("balance Average: $"+balanaceAverage);
// Find how many customers' names begin with an arbitrary letter. Write a function to answer this question, then log an answer.
NameBeginnging(false,customers);
console.log(customerNameBeginnging);
// Find how many customers' friends' names begin with an arbitrary letter. Write a function to answer this question, then log an answer.
NameBeginnging(true,customers);

console.log(customerFriendBeginnging);
// Find the names of all customers who are friends with a given customer (by name). i.e. Which customers have that customer's name in their friends list?
getFriendsList();
console.log("customerFriends");
console.log(customerFriends);
// Find the top 3 most common tags among the customers.
updateTagCount();
console.log(customerTags);
// Create a summary of genders, the output should be
  console.log("Gender");
  console.log(output);
 