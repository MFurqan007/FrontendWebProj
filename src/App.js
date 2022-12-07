
import './App.css';
import 'bootstrap';
import React, {useState, useEffect} from 'react';

import {
  BrowserRouter,
  useNavigate,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";

let profiledata = null;
function Login(){
  let navigate = useNavigate(); 
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  return(
    <div className="Login">
        <div className='LoginBox'>
            <div className='Right'>
                <img src="./Logo.jpg" alt='logo' className='logopic'/>
            </div>
            <div className='Left'>
              <form>
                  <legend>Login</legend>
                  <div className="mb-3">
                    <label for="disabledTextInput" className="form-label">Username</label>
                    <input type="text" id="disabledTextInput" className="form-control" placeholder="Username" value={userName} onChange={event =>{
                      setuserName(event.target.value);
                    }}/>
                  </div>
                  <div className="mb-3">
                    <label for="disabledPasswordInput" className="form-label">Password</label>
                    <input type="password" id="disabledPasswordInput" className="form-control" placeholder="Password" value={password} onChange={event =>{
                      setpassword(event.target.value);
                    }}/>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={async (event)=>{
                    event.preventDefault()

                    const data = await fetch(`http://localhost:4000/user/login/${userName}/${password}`)
                    const dj = await data.json();
                    profiledata = dj;
                    console.log(profiledata);
                    navigate("/Home");
                    }
                  }
                  >Submit</button>
                  <div className= "centerbtn">
                    <Link to="/SignUp" element={<Signup/>}><button type="signup" className="btn btn-primary">Sign Up</button></Link>
                  </div>
              </form>
            </div>
        </div>
    </div>
  );
}

function Signup(){
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [dob, setdob] = useState('');
  const [proffession, setproffession] = useState('');
  const [gender, setgender] = useState(''); 

  return(
    <div className='SignUp'>
      <div className='Box'> 
        <form action="">
          <legend className='lcent'>Signup</legend>
          <div class ='lbox'>
              <div className="mb-2">
                <label for="formGroupUsername" className="form-label">Username</label>
                <input type="text" className="form-control" id="formGroupUsername" placeholder="Username" onChange={event=>{
                  // console.log(userName);
                  setuserName(event.target.value);
                }}/>
              </div>
              <div className="mb-2">
                <label for="formGroupName" className="form-label">Name</label>
                <input type="text" className="form-control" id="formGroupName" placeholder="Name" onChange={event =>{
                   setname(event.target.value); 
                }}/>
              </div>
              <div className="mb-2">
                <label for="formGroupPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="formGroupPassword" placeholder="Password" onChange={event =>{
                  setpassword(event.target.value); 
                }}/>
              </div>
              <div className="mb-2">
                <label for="formGroupDOB" className="form-label">Date Of Birth</label>
                <input type="date" className="form-control" id="formGroupDOB" placeholder="DOB" onChange={event =>{
                  setdob(event.target.value); 
                }}/>
              </div>
              <div className="mb-2">
                <label for="formGroupProffession" className="form-label">Proffession</label>
                <input type="text" className="form-control" id="formGroupProffession" placeholder="Proffession" onChange={event =>{
                  setproffession(event.target.value); 
                }}/>
              </div>

              <div className="mb-2">
                <label for="formGroupGender" className="form-label">Gender</label>
                <input type="text" className="form-control" id="formGroupGender" placeholder="Gender" onChange={event =>{
                  setgender(event.target.value); 
                }}/>
              </div>
              {/* <div className="gendercss" onChange={this.setGender.bind(this)}>
                <label for="formGroupGender" className="form-label">Gender</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="GenderRadio" id="MaleRadio"/>
                    <label className="form-check-label" for="flexRadioDefault1">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="GenderRadio" id="FemaleRadio" checked/>
                    <label className="form-check-label" for="flexRadioDefault2">
                      Female
                    </label>
                  </div>
              </div> */}

            </div>
              <div className= "centerbtn">
                    <button type="signup" className="btn btn-primary" onClick={event => {
                      event.preventDefault();
                      console.log(userName); 
                      console.log(password);
                      console.log(name);
                      console.log(dob);
                      console.log(proffession);
                      console.log(gender);

                      fetch('http://localhost:4000/user/create', {  // Enter your IP address here
                      headers: {'Content-Type': 'application/json'},
                        method: 'POST', 
                        mode: 'cors', 
                        body: JSON.stringify({
                          "name":`${name}`,
                          "userName":`${userName}`,
                          "password":`${password}`,
                          "dateOfBirth":`${dob}`,
                          "proffession":`${proffession}`,
                          "gender":`${gender}`
                        })

                      })
                    }}>Sign Up</button>
              </div>    
        </form>
      </div>
    </div>
  ); 
}

function Post(){
  return(
    <div className='PostMain'>
      <h1>Hello World</h1>
    </div>
  ); 
}

function AllPosts(){
  return(
    <div className='mainPosts'>
      <div className='postsDiv'>
        <Post/>
        <Post/>
        <Post/>
      </div>
    </div>
  ); 
}
function Chat(){
  return(
    <div className='chatbox'>  
      <div className='profilephoto'>

      </div>
      <div className='profileinfo'>

      </div>
    </div>
  );
}

function Chats(){
  return(
    <div className='mainDiv'>
        <p className='Text'>Messages</p>
          <div className='AllTexts'>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
              <Chat/>
          </div>
    </div>

  ); 
}

function PostAccount(){
  return(
    <div className='PostMain2'>
      <div className='PostPic2'>

      </div>
      <div className='PostCaption2'>
        <p className='PostCaption3'>Caption:</p>
      </div>
    </div>
  );
}

function ProfileInfo(){
  return(
    <div className='mainAccount'>
        <div className='AccountInfo'>
         <div className='MainImageHolder'>
            <div className='ImageHolder'>

            </div>
         </div>
          <div className='AccountDets'>

          </div>
        </div>
        <div className='AccountPosts'>
            {/* <p className='PostTitleText'>Posts</p> */}
            <div className='AllPosts'>
              <PostAccount/>
              <PostAccount/>
              <PostAccount/>
              <PostAccount/>
              <PostAccount/>
            </div>
            
        </div>
    </div>
  );
}

function AddEvent(){
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setcaption] = useState(null); 


  function handleclick(){
    // event =>{
        

    // }

    // fetch('http://localhost:4000/profile-upload-single', {  // Enter your IP address here

    //   method: 'POST', 
    //   mode: 'cors', 
    //   body: JSON.stringify(selectedImage) // body data type must match "Content-Type" header

    // })

    console.log(selectedImage); 
    console.log(caption); 

    setSelectedImage('');
    setcaption(''); 
  }

  return(
    <div className='MForm'>
      
        {/* <div
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div> */}
      
     {/* <form method='POST' action="http://localhost:4000/profile-upload-single" enctype="multipart/form-data"> */}
      <div className='PostPic'>
        {selectedImage && <img src={URL.createObjectURL(selectedImage)  } className='PostPic'/>}
      </div>
      <input type="file" id="uploadImageplace" name="myImage" className='chooseimg' onChange={(event) => {
            // console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
      hidden={true}/>

      <button className="chooseimg" onClick={(event) => {
            document.getElementById('uploadImageplace').click();
          }}>Choose Image</button>
      <div className='PostCaption'>
        <p className='CaptionText'>Caption</p>
        <textarea name="CaptionInput" cols="35" rows="3" placeholder='Enter....'  value={caption} onChange={event => {
          setcaption(event.target.value);
        }}/>
      </div>
      <button className="savebtn" onClick={handleclick}>Save</button>
      {/* </form> */}
    </div>
  );
}

function Community(){
  return(
    <div className='CommunityPage'>
      <h1>Community</h1>
    </div>
  );
}

function MainPage(){
  const [HomeFlag, setHomeFlag] = useState(null);
  const [CommunityFlag, setCommunityFlag] = useState(null); 
  const [AccountFlag, setAccountFlag] = useState(null);
  const [MessengerFlag, setMessengerFlag] = useState(null); 
  const [AddPostFlag, setAddPost] = useState(null);
  // const [LogoutFlag, setLogoutFlag] = useState(null); 

  let navigate = useNavigate(); 
  return(
    <div className='MainPage'>
      <nav className='Navbar'>
        <div className='contain'>
            <img src="./Logo2.jpeg" alt ="Logo2" className='logopic2'/>
            <p className='title'>Veteran Meet</p>
        </div>
      </nav>
      <div className='MainComp'>
        <div className='mainNav'>
          <div className='bar'>
              <img src="./Home.svg" alt="home" className={HomeFlag? "select" : "unselect"} onClick={event =>{
                setHomeFlag(true); 
                setAccountFlag(false);
                setCommunityFlag(false);
              }}/>
              <img src="./Community.svg" alt="community" className={CommunityFlag? "select" : "unselect"} onClick={event =>{
                setHomeFlag(false); 
                setAccountFlag(false);
                setCommunityFlag(true);
              }}/>
              <img src="./Account.svg" alt="account" className={AccountFlag? "select" : "unselect"} onClick={event =>{
                setHomeFlag(false); 
                setAccountFlag(true);
                setCommunityFlag(false);
              }}/>
              <img src="./powerOff.svg" alt="power off" className='unselect' onClick={event =>{
                navigate("/");
              }}/>
          </div>
        </div>
        {HomeFlag && <AllPosts/>}
        {CommunityFlag && <Community/>}
        {AccountFlag && <ProfileInfo/>}
        {/* <AllPosts/> */}
        {/* <ProfileInfo/> */}
        {/* <Community/> */}
        <div className='mainChats'>
            <div className='selection'>
              <img src="./AddEvent.svg" alt="AddEvent" className={AddPostFlag? "select" : "unselect"} onClick={event =>{
                setMessengerFlag(false); 
                setAddPost(true);
              }}/>
              <img src="./Messenger.svg" alt="Chats" className={MessengerFlag? "select" : "unselect"} onClick={event =>{
                setMessengerFlag(true); 
                setAddPost(false);
              }}/>
            </div>
            {MessengerFlag && <Chats/>}
            {AddPostFlag && <AddEvent/>}
            {/* <Chats/> */}
            {/* <AddEvent/> */}

        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    // <div className="App">
    //   {/* <h1>Hello Web Project</h1> */}
    //   {/* <Login/> */}
    //   <Signup/>
    //   {/* <MainPage/> */}
    // </div>


    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/Signup" element={<Signup/>}/>
          <Route exact path="/Home" element={<MainPage/>}/>
 
        </Routes>
        
    </BrowserRouter>
  );
}

export default App;
