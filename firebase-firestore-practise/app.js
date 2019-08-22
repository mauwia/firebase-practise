var db=firebase.firestore();
var form =document.getElementById('add-cafe-form')
var submit=document.getElementById('submit')
//db.settings({timestampsInSnapshots:true});
/*db.collection('cafes').get().then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
            rendercafe(doc)
        }) 
})*/
var list=document.getElementById('cafe-list');
function rendercafe(doc){
    let li=document.createElement('li');
    let name=document.createElement('span');
    let area=document.createElement('span');
    let cross=document.createElement('div');
    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().name;
    area.textContent=doc.data().area;
    list.appendChild(li)
    li.appendChild(name);
    li.appendChild(area);
    li.appendChild(cross);
    cross.textContent='x';
    cross.addEventListener('click',e => {
     
        let id=e.target.parentElement.getAttribute('data-id')
        db.collection('cafes').doc(id).delete()
    })
}
submit.addEventListener('click', e =>{
     e.preventDefault();
    db.collection('cafes').add({
       
        name:form.name.value,
        area:form.area.value
        
    })
    form.name.value="";
    form.area.value="";
})
db.collection('cafes').onSnapshot(snapshot => {
    let changes=snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added')
            {
                rendercafe(change.doc)
            }
        else if(change.type == 'removed')
            {
                let li = document.querySelector('[data-id='+change.doc.id+']');
                list.removeChild(li);
            }
    })
})