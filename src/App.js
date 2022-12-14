
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
const images = ["mypic.jpg","Travel Journal.jpeg","1670416315865Travel journal.jpeg"];
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

function Post({idata}){
  const [img,setimg] = useState(null)

  useEffect(()=>{
    async function getimage(){
      const imgfile = await fetch('http://localhost:4000/user/userimage/'+idata)
      const img__ = await imgfile.blob()
      setimg(img__)
    }
    getimage()
  },[])

  return(
    <div className='PostMain'>
      <div className='PostMainImg'>
        {img && <img src={URL.createObjectURL(img)  } className='PostPic'/>}
        {/* <img src={idata}  className='PostPic'/> */}
      </div>
    </div>
  ); 
}

function AllPosts({imgdata}){
  
  return(
    <div className='mainPosts'>
      <div className='postsDiv'>
        {images.map((img) => {
          return(
            <Post idata = {img}/>
          )  
        })
        }
        {/* <Post idata = {imgdata}/> */}
        {/* {imgdata.map((img)=>{
          return(
            <Post idata = {img} />
          )
        })} */}
        {/* <Post/>
        <Post/> */}
      </div>
    </div>
  ); 
}
// function Chat(){
//   return(
//     <div className='chatbox'>  
//       <div className='profilephoto'>

//       </div>
//       <div className='profileinfo'>

//       </div>
//     </div>
//   );
// }

// function Chats(){
//   return(
//     <div className='mainDiv'>
//         <p className='Text'>Messages</p>
//           <div className='AllTexts'>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//               <Chat/>
//           </div>
//     </div>

//   ); 
// }

function Chat({senderuserName,latestMessage}){
  const [image, setImage] = useState(null);

  useEffect(()=>{
    async function getImageFile(){
      const imageFile = await fetch("http://localhost:4000/user/userImage")
      // const file = await imageFile.json()
      console.log(imageFile)
    }

    getImageFile()
  },[])

  return(
    <div className='chatbox'>  
      <div className='profilephoto'>
        {image && image}
      </div>
      <div className='profileinfo'>
        <div><h4>{senderuserName}</h4></div>
        <div className="lastestChat">{latestMessage}</div>
      </div>
    </div>
  );
}

function ChatWindow({receiver,sender,goBack}){
  const [messages, setMessages] = useState([]);

  async function getMessages(){
    let data = await fetch(`http://localhost:4000/chat/get/${receiver}/${sender}`)
    console.log(data)
    let data_ = await data.json()

    setMessages(data_)
}

  useEffect(()=>{
    
    getMessages()
  },
  [])
  const [newMessage, setNewMessage] = useState('');
  

  return(

    <div>
      <button onClick={goBack}>Back</button>
        <div>
          {messages.map((msg)=>{
            let classnm = msg.sender==receiver ? "leftbox" : "rightbox"
            return(
              <div>
                <div className={classnm}>
                  <div className='messagebox'>{msg.message}</div>
                </div>
                <div>

                </div>
              </div>
            )
          })}
        </div> 
        <input type="text" id="disabledTextInput" className="form-control" placeholder="New Message" onChange={event =>{
                      setNewMessage(event.target.value)}}/>
                <button onClick={async ()=>{
                  await fetch('http://localhost:4000/chat/create', {  // Enter your IP address here
                      headers: {'Content-Type': 'application/json'},
                        method: 'POST', 
                        mode: 'cors', 
                        body: JSON.stringify({
                          "sender":sender,
                          "receiver":receiver,
                          "message":newMessage,
                          "date":Date.now()
                        })
                
                })
                await getMessages()
                }}> Send</button>     
    </div>
  )
}

function Chats(){

  const [messages, setMessages] = useState([]);
  const [chatWindow,setChatWindow] = useState(null);
  const [receiver,setReceiver] = useState(null);
  const [sender,setSender] = useState(null);

  useEffect(()=>{
    const getdatafunc = async ()=>{
      let messages_json = await fetch(`http://localhost:4000/chat/get/${profiledata.userName}`)
      let messages = await messages_json.json()
      setMessages(messages);
    }
    getdatafunc()
  },[])  

  // let uniqueSenders = new Set(messages.sender)

  // uniqueSenders = Array.from(uniqueSenders)

  // const formattedMessages = uniqueSenders.map((sender)=>{
  //   return messages.filter((message)=> message.sender == sender)
  // })

  // console.log(formattedMessages)

  const prev = ()=>{
    setChatWindow(false)
  }

  return(
    <div className='mainDiv'>
        <p className='Text'>Messages</p>
          <div className='AllTexts'>
              {chatWindow ? <ChatWindow receiver={receiver} sender={sender} goBack={prev}/> : 
              messages.filter((msg)=>msg.receiver == profiledata.userName).map((msg)=>{
                return(
                  <button onClick={()=>{
                    setSender(profiledata.userName)
                    setReceiver(msg.sender)
                    setChatWindow(true)
                  }} className="chatButton">
                    <Chat 
                      senderuserName={msg.sender}
                      latestMessage={msg.message}
                    />
                  </button>
                )
              })}
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
    <div>
    <form method="POST" action="http://localhost:4000/profile-upload-single" enctype="multipart/form-data">
    <div>
        <label>Upload profile picture</label>
        <input type="file" id="imagefileup" name="profile-file" required/>
    </div>
    <div>
        <input type="submit" value="Upload" onClick={()=>{
          images.push(document.getElementById("imagefileup").value)
        }} />
    </div>
    </form>
    {/* // <div className='MForm'> */}
      
        {/* <div
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div> */}
      
     {/* <form method='POST' action="http://localhost:4000/profile-upload-single" enctype="multipart/form-data">
      <div className='PostPic'>
        {selectedImage && <img src={URL.createObjectURL(selectedImage)  } className='PostPic'/>}
      </div>
      <input type="file" id="uploadImageplace" name="myImage" className='chooseimg' onChange={(event) => {
            // console.log(event.target.files[0]);
            images.push(event.target.files[0].name)
            setSelectedImage(event.target.files[0]);
          }}
      hidden={true}/>

      <button className="chooseimg" onClick={(event) => {
            event.preventDefault()
            document.getElementById('uploadImageplace').click();
          }}>Choose Image</button>
      <div className='PostCaption'>
        <p className='CaptionText'>Caption</p>
        <textarea name="CaptionInput" cols="35" rows="3" placeholder='Enter....'  value={caption} onChange={event => {
          setcaption(event.target.value);
        }}/>
      </div>
      <button className="savebtn" type="submit" onClick={handleclick}>Save</button>
      </form>
    </div> */}
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

function AddFriendTab({data}){
  const [friend, setfriend] = useState(null);
  const [caption, setcaption] = useState(null); 
  console.log(data)
  return(
    <div className='AddFriendTab'>
      <div className='FriendImage'>

      </div>
      <div className='FriendName'>
        <p className='FriendNText'>{data.userName}</p>
      </div>
      <button className='Follow' onClick={async (event)=>{
          event.preventDefault()

          const d = await fetch(`http://localhost:4000/user/add_followers/${profiledata.userName}/${data.userName}`,{  // Enter your IP address here
            headers: {'Content-Type': 'application/json'},
              method: 'PUT', 
              mode: 'cors',
            });
        }
      }>+</button>
    </div>
  );
}
function AddFriend({data}){
  // console.log(data)
  return(
    <div className='FriendPage'>
        {/* <h1>Friends</h1> */}
        <div className='FriendsTitle'>

        </div>
        <div className='AllPossibleFriends'>
          {data.map((d)=>{
            return (<AddFriendTab data = {d}/>)
          })}
          
          {/* <AddFriendTab/>
          <AddFriendTab/>
          <AddFriendTab/>
          <AddFriendTab/>
          <AddFriendTab/>
          <AddFriendTab/>
          <AddFriendTab/>
          <AddFriendTab/>
          <AddFriendTab/>

          <AddFriendTab/>

          <AddFriendTab/>
          <AddFriendTab/>
          <AddFriendTab/> */}
        </div>
    </div>
  );
}
function MainPage(){
  const [HomeFlag, setHomeFlag] = useState(null);
  const [CommunityFlag, setCommunityFlag] = useState(null); 
  const [AccountFlag, setAccountFlag] = useState(null);
  const [MessengerFlag, setMessengerFlag] = useState(null); 
  const [AddPostFlag, setAddPost] = useState(null);
  const [AddFriendFlag, setAddFriend] = useState(null); 


  const [AddFriendsData, setAddFriendsData] = useState(null); 
  const [Postimg, setPostimg] = useState(null); 
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
              <img src="./Home.svg" alt="home" className={HomeFlag? "select" : "unselect"} onClick={async (event) =>{
                setHomeFlag(true); 
                setAccountFlag(false);
                setCommunityFlag(false);
                setAddFriend(false);

                const data = await fetch(`http://localhost:4000/user/userImage`,{
                  headers: {'Content-Type': 'application/json'},
                  mode: 'cors',
                })
                const dj = await data.blob(); 
                // const dj = await data.json()
                setPostimg(dj);
                console.log(dj); 
              }}/>
              <img src="./Community.svg" alt="community" className={CommunityFlag? "select" : "unselect"} onClick={event =>{
                setHomeFlag(false); 
                setAccountFlag(false);
                setCommunityFlag(true);
                setAddFriend(false);
              }}/>
              <img src="./Account.svg" alt="account" className={AccountFlag? "select" : "unselect"} onClick={event =>{
                setHomeFlag(false); 
                setAccountFlag(true);
                setCommunityFlag(false);
                setAddFriend(false);
              }}/>
              <img src="./AddIconFriend.svg" alt="add friend" className={AddFriendFlag? "select" : "unselect"} onClick={async (event)=>{
                    setHomeFlag(false); 
                    setAccountFlag(false);
                    setCommunityFlag(false);
                    setAddFriend(true);
                    event.preventDefault()

                    const data = await fetch(`http://localhost:4000/user/get`)
                    const dj = await data.json();
                    setAddFriendsData(dj)
                    console.log(dj);
                  }
                }/>
              <img src="./powerOff.svg" alt="power off" className='unselect' onClick={event =>{
                navigate("/");
              }}/>
          </div>
        </div>
        {HomeFlag && Postimg && <AllPosts imgdata ={Postimg}/>}
        {CommunityFlag && <Community/>}
        {AccountFlag && <ProfileInfo/>}
        {AddFriendsData && AddFriendFlag && <AddFriend data= {AddFriendsData}/>}
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
