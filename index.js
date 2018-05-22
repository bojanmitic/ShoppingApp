const inputName = document.getElementById('inputName');
const inputQuantity = document.getElementById('inputQuantity');
const ulNotDone = document.querySelector('#notDone');
const ulDone = document.querySelector('#done');
const colapseList = document.querySelector('#list-colapse');
let id = 0;
const shoppingList = [];
const doneList = [];

const displayItem = ()=> {
    clearDisplay();
    for(let i = 0; i<shoppingList.length; i++ ){
        const li = document.createElement('li');
        li.id = shoppingList[i].id;
        li.className = 'li-item';
        const spanName = document.createElement('span');
        spanName.textContent = shoppingList[i].name;
        spanName.className = 'name-class';
        spanName.id = 'name_'+shoppingList[i].id;
        const spanQuantity = document.createElement('span');
        spanQuantity.className = 'quantity-class'
        spanQuantity.id = 'quantity_'+shoppingList[i].id;
        //checkbox
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.name = 'name';
        checkBox.value = 'value';
        checkBox.className = 'chekckbox'+shoppingList[i].id;
        checkBox.id = shoppingList[i].name;
        const label = document.createElement('label');
        label.htmlFor = '';
        label.id = shoppingList[i].id;
        
        spanName.textContent = shoppingList[i].name;
        spanQuantity.textContent = shoppingList[i].quantity;
        li.appendChild(checkBox);
        li.appendChild(label);
        li.appendChild(spanName);
        li.appendChild(spanQuantity);
        ulNotDone.appendChild(li);
        //edit button
        const editButton = document.createElement('button');
        editButton.id = shoppingList[i].id;
        const editIcon = document.createElement('i');
        editIcon.className = 'far fa-edit';
        editButton.className = 'btn-edit';
        editIcon.id = shoppingList[i].id;
        editButton.appendChild(editIcon);
        li.appendChild(editButton);
        //delete icon
        const deleteIcon = document.createElement('i');
        deleteIcon.className = "far fa-trash-alt";
        //delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.id = shoppingList[i].id;
        deleteBtn.className = 'btn-delete';
        deleteBtn.appendChild(deleteIcon);
        li.appendChild(deleteBtn);
    }
}
const clearDisplay = () => {
    while(ulNotDone.firstChild){
        ulNotDone.removeChild(ulNotDone.firstChild);
    }
}
const addItem = (e) => {
    e.preventDefault();

    const newName = inputName.value;
    const quantity = inputQuantity.value;

    if(newName.length === 0 ) {
        alert("Please insert item");
    }
     else if(shoppingList.find(function(item){
         return item.name === newName;
     })){
        alert("Item Already exists");
        }
    else{
        id++;
        shoppingList.unshift({
            name:newName,
            quantity:quantity,
            id:id
         });
    } 
    displayItem();
    inputName.value = '';
    inputQuantity.value = 0;
}
ulNotDone.addEventListener('click',function(event){
    const prentId = event.target.parentNode.id;
    let ItemId = shoppingList.findIndex((element) => {
        return prentId == element.id;
    });
    if(event.target.className === 'btn-delete' || event.target.className === 'far fa-trash-alt'){
        shoppingList.splice(ItemId, 1);
        displayItem();
    }else if(event.target.tagName ==='LABEL' || event.target.tagName === 'CHECKBOX'){

        doneList.push(shoppingList[ItemId]);
        shoppingList.splice(ItemId, 1);
        displayItem();
        displayItemDoneList();
    }
    else if(event.target.className === 'btn-edit' || event.target.className === 'far fa-edit'){  
       const n = 'name_'+event.target.id;
       const name = document.getElementById(n);
       const quantity = document.getElementById('quantity_'+event.target.id);
       if(name.contentEditable === 'inherit' || name.contentEditable === 'false'  || quantity.contentEditable ==='inherit' ||  quantity.contentEditable ==='false'){
           console.log(name.contentEditable)
          name.contentEditable = 'true';
          name.focus();
          quantity.contentEditable = 'true';

       }else if(name.contentEditable === 'true' || quantity.contentEditable ==='true'){
        
        name.contentEditable = 'false';
        quantity.contentEditable = 'false';  
        let ItemId = shoppingList.findIndex((element) => {
            return event.target.id == element.id;
        });
        shoppingList[ItemId].name = name.textContent;
        shoppingList[ItemId].quantity = quantity.textContent;
        displayItem();
       }
    }
});
// ulDone.addEventListener('mouseout',function(event){
    
// });
const  clearDisplayDoneList = () => {
    while(done.firstChild){
        done.removeChild(done.firstChild);
    }
}
const displayItemDoneList = () => {
    clearDisplayDoneList();
    for(let i=0; i<doneList.length; i++){
        const li = document.createElement('li');
        li.id = doneList[i].id;
        li.className = 'li-item-done';
        const spanName = document.createElement('span');
        spanName.className = 'name-class-done';
        const spanQuantity = document.createElement('span');
        spanQuantity.className = 'quantity-class';

        //undo icon
        const undoIcon = document.createElement('i');
        undoIcon.className = "fas fa-undo";
        
        //undo button
        const undoBtn = document.createElement('button');
        undoBtn.className = 'btn-undo';
        undoBtn.id = doneList[i].id;
        undoBtn.appendChild(undoIcon);
        li.appendChild(undoBtn);
        
        spanName.textContent = doneList[i].name;
        spanQuantity.textContent = doneList[i].quantity;
    
        //li.appendChild(spanName);
        li.appendChild(spanName);
        li.appendChild(spanQuantity);
        ulDone.appendChild(li);
        //delete icon
        const deleteIcon = document.createElement('i');
        deleteIcon.className = "far fa-trash-alt";

        //delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.id = doneList[i].id;
        deleteBtn.className = 'btn-delete';
        deleteBtn.appendChild(deleteIcon);
        li.appendChild(deleteBtn);
    }
}
ulDone.addEventListener('click',function(event){
    const prentId = event.target.parentNode.id;
    const ItemId = doneList.findIndex((element) => {
        return prentId == element.id;
    });
    if(event.target.className === 'btn-delete' || event.target.className === 'far fa-trash-alt'){
        doneList.splice(ItemId, 1);
        displayItemDoneList();
    }
    else if(event.target.className === 'btn-undo' || event.target.className === 'fas fa-undo'){
        console.log('undo', ItemId); 
        shoppingList.push(doneList[ItemId]);
        doneList.splice(ItemId, 1);
        displayItem();
        displayItemDoneList();
    }
});
colapseList.addEventListener('click', function(){ 
    //ulDone.style.display=(ulDone.style.display!='block')?'block':'none';
   Array.from(ulDone.children).forEach((el, i)=>{
       setTimeout(() => {
           el.style.display=(el.style.display==='grid')?'none':'grid';
       }, (i + 1) * 100)
   })
});

