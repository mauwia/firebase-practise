var signUpForm=document.getElementById('signup-form')
signUpForm.addEventListener('submit',e=>{
    e.preventDefault()
    let email=signUpForm.signup_email.value
    let password=signUpForm.signup_password.value
//    console.log(email,password)
   auth.createUserWithEmailAndPassword(email,password).then(cred => {
       return db.collection('User').doc(cred.user.uid).set({
           bio : signUpForm.signup_bio.value
       });
       console.log(cred,cred.user.uid)
   }).then(()=>{
       signUpForm.reset();
   })
    
})
auth.onAuthStateChanged(user =>{
    
    if(user)
        {
            //console.log('user sign in',user)
            db.collection('guides').onSnapshot(snapshots => {
            renderGuide(snapshots.docs)
            UI_setup(user)
            },err=>console.log(err.message))
            
        }
    else{
        
        console.log('sign out')
        renderGuide([])
        UI_setup()
    }
})
var logout=document.getElementById('logout');
logout.addEventListener('click',e=>{
    e.preventDefault();
    auth.signOut()
})
var loginform=document.getElementById('login-form')
loginform.addEventListener('submit',e => {
    e.preventDefault();
    let email=loginform.login_email.value;
    let password=loginform.login_password.value;
    auth.signInWithEmailAndPassword(email,password)
    loginform.reset()
})