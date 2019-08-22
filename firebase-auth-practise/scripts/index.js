// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
let guideForm=document.getElementById('create-form');
guideForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let guideTitle=guideForm.guide_title.value;
    let guideContent=guideForm.guide_content.value;
    db.collection('guides').add({
        title:guideTitle,
        content:guideContent
    }).then(()=>guideForm.reset()).catch(err => console.log(err.message))
})
let guide_list=document.getElementById('guide_list');
function renderGuide(snapshots)
{
    if(snapshots.length)
    {let html=''
        snapshots.forEach(snapshot=>{
        const li=`<li>
            <div class="collapsible-header grey lighten-4">${snapshot.data().title}</div>
            <div class="collapsible-body white">${snapshot.data().content}</div>
            </li>`
            html+=li
        })
        guide_list.innerHTML=html
    }
    else{
        guide_list.innerHTML=`<h5 class='center'>Login to see guide</h5>`

    }
    
}
const logged_in=document.querySelectorAll('.logged-in')
const logged_out=document.querySelectorAll('.logged-out')
const accountDetails=document.querySelector('.account-details')
const UI_setup = (user) => {
    if(user)
        {
            db.collection('User').doc(user.uid).get().then(docs =>{
//                console.log(docs.data().bio)
                const html=`<div>Logged in as ${user.email}</div>
                    <div>${docs.data().bio}</div>` 
            accountDetails.innerHTML=html
            })
            
            logged_in.forEach(items => items.style.display='block')
            logged_out.forEach(items =>items.style.display='none')
        }
    else{
            
            logged_out.forEach(items => items.style.display='block')
            logged_in.forEach(items =>items.style.display='none')
    }
}