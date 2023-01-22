let time = document.getElementById("current-time"); 

setInterval(() => {

    let d = new Date();
    time.innerHTML = d.toLocaleTimeString();
    
}, 1000);

const audio = new Audio();
audio.src = "./assets/beep.mp3";



const orderidarray = [];
const orderitemidarray = [];
const orderitemsarray = [];
const orderpricearray = [];
const orderarray = [];
const orderitemquantity = [];


let i = 0;

function orderbasket(itemid, itemname, itemprice) {
    
//console.log(orderitemsarray.indexOf(itemname));
//const itemindexnumber = orderitemsarray.indexOf(itemname);
//console.log(orderitemquantity[itemindexnumber])

if (orderitemsarray.indexOf(itemname) > -1) {
    const itemindexnumber = orderitemsarray.indexOf(itemname);
    orderitemquantity[itemindexnumber] = orderitemquantity[itemindexnumber] + 1;
    incrementitem(orderidarray[itemindexnumber], 1)
} else {




orderidarray.push(i);
orderitemidarray.push(itemid); 
orderitemsarray.push(itemname);
orderpricearray.push(itemprice);
orderitemquantity.push(1);



orderarray.push(itemid, itemname, itemprice);
let orderlist = document.getElementById('orderlist');

const orderitem = document.createElement('li'); 
orderitem.className = 'd-flex align-items-center ms-2 me-2 mt-3 fw-bold'; 

const decrementbutton = document.createElement('button');
const incrementbutton = document.createElement('button');
const decrementbuttontext = document.createTextNode('-');
const incrementbuttontext = document.createTextNode('+');
const totalitemspan=document.createElement('span');
const totalitemtext = document.createTextNode('1');

decrementbutton.setAttribute('onclick', 'incrementitem('+i+', -1)')
incrementbutton.setAttribute('onclick', 'incrementitem('+i+', 1)')

decrementbutton.className = 'btn-sm  ms-1 me-1 btn btn-primary  rounded-pill fw-bold'
incrementbutton.className = 'btn-sm  me-1 btn btn-primary rounded-pill fw-bold'
totalitemspan.className = ' px-2 fw-bold item'+ i;

decrementbutton.appendChild(decrementbuttontext);
incrementbutton.appendChild(incrementbuttontext);
totalitemspan.appendChild(totalitemtext);
orderitem.appendChild(incrementbutton);
orderitem.appendChild(totalitemspan);
orderitem.appendChild(decrementbutton);



const orderitempricespan = document.createElement('span');


const orderitemname = document.createTextNode(itemname);
const orderitemprice = document.createTextNode(' ₱' + itemprice);

orderitempricespan.className = 'text-danger d-flex align-items-end'

orderitempricespan.appendChild(orderitemprice);

const orderitemleftsidespan = document.createElement('span');

const deletebutton = document.createElement('button');
const deletebuttontext = document.createTextNode('Remove');

deletebutton.setAttribute('onclick', 'deleteitem('+i+', this)');

deletebutton.appendChild(deletebuttontext);
deletebutton.className = 'btn btn-danger btn-sm m-2 ms-auto';

orderitemleftsidespan.appendChild(orderitemname);

orderitemleftsidespan.appendChild(orderitempricespan);


orderitem.appendChild(orderitemleftsidespan);


orderitem.appendChild(deletebutton);


orderlist.appendChild(orderitem);

i++;
}

totalitems(); 
costitems();

console.log(orderidarray);
console.log(orderitemidarray);




}

function incrementitem(orderid, val) {

    const itemspan = document.querySelector('.item' + orderid);
    itemspan.innerText = parseInt(itemspan.innerText) + val;

    const indexnum = orderidarray.indexOf(orderid);
    orderitemquantity[indexnum] = parseInt(itemspan.innerText);
    totalitems();
    costitems ();

    if(itemspan.innerText == 0) {

        orderitemidarray.splice(indexnum, 1);
        orderidarray.splice(indexnum, 1);

        orderitemsarray.splice(indexnum, 1);
        orderpricearray.splice(indexnum, 1);
        orderitemquantity.splice(indexnum, 1);
        orderitemquantity.splice(indexnum, 1);
        console.log(orderidarray); 
        totalitems();  
        costitems ();
        console.log(itemspan);
        console.log(itemspan.parentElement);
        orderlist.removeChild(itemspan.parentElement);
    
        if (orderpricearray.length === 0) {
            document.getElementById('amount').value = 0;
        }
    }
}


function totalitems(){
    //document.getElementById("totalitems").innerText = orderarray.length;
    if (orderitemquantity.length) {
        document.getElementById("totalitems").innerText = orderitemquantity.reduce((total, num) => {
            return total + num
        })
    }
    
    console.log(orderitemquantity)
};

function costitems() {
    if (orderpricearray.length === 0) {
        document.getElementById("totalcost").innerText = 0;
    }
    else {

    const totaltemparray = [];
    orderitemquantity.map((quantity, index) => {
            console.log(quantity);
            console.log(index);
    totaltemparray.push(quantity * orderpricearray[index])
    })

    document.getElementById("totalcost").innerText = totaltemparray.reduce(sumarray).toFixed(2);
    
    document.getElementById('amount').value = totaltemparray.reduce(sumarray).toFixed(2);

    
    function sumarray(total, sum){
        return total + sum;

        };



};
};



function orderbasketclear() {
    let orderlist = document.getElementById('orderlist');
    document.getElementById('amount').value = 0;
    orderlist.innerHTML = "";
    orderitemsarray.length = 0;
    orderpricearray.length = 0;
    orderarray.length = 0;
    orderidarray.length = 0;
    orderitemquantity,length = 0;
    i = 0;
    totalitems();
    costitems ();
}

function deleteitem(orderid, button){
    const indexnum = orderidarray.indexOf(orderid);
    orderidarray.splice(indexnum, 1);
    orderitemsarray.splice(indexnum, 1);
    orderpricearray.splice(indexnum, 1);
    orderitemquantity.splice(indexnum, 1);
    console.log(orderidarray);   
    totalitems();
    costitems ();
    console.log(button);
    console.log(button.parentElement);
    orderlist.removeChild(button.parentElement);

    if (orderpricearray,length === 0) {
        document.getElementById('amount').value = 0;
    }
}

const calculatorscreendisplay = document.getElementById('calculatorscreen');

function calculatorpress(number){

    console.log(calculatorscreendisplay.length);
    if (calculatorscreendisplay.value == 0 && number == '00') {
        calculatorscreendisplay = '0.';
    } else if (calculatorscreendisplay.value == 0 && number == '0') {
        calculatorscreendisplay = '0.';
    } else if (calculatorscreendisplay.value == '' && number == '00') {
        calculatorscreendisplay.value = '0';
    } else if (calculatorscreendisplay.value.includes('.') === true && number =='.') {
        calculatorscreendisplay.value = calculatorscreendisplay.value;
    } else {
    calculatorscreendisplay.value += number;
    }

    if (calculatorscreendisplay.value == '.') {
        calculatorscreendisplay.value = '0.';
    };
    
};

function exactamount () {
    calculatorscreendisplay.value = document.getElementById('amount');
    calculatorscreendisplay.value = amount.value;
       
};


function calculatorcancel () {
calculatorscreen.value = '';
customeramountpaid.value = '';

};


function confirmpaidbutton() {
    const customeramountpaid = document.getElementById('customeramountpaid');
    customeramountpaid.value = calculatorscreendisplay.value;
    
    const customeramountchange = document.getElementById('amountchange');
    customeramountchange.value = customeramountpaid.value - document.getElementById('amount').value;

}
