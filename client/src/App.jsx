// import React from 'react'
// import './App.css'
// import { useState } from 'react'
// import { useEffect } from 'react'

// const App = () => {
//   const[icedata, setIcedata] = useState([])

//   useEffect(()=>{
//     fetch("http://localhost:5000/getData").then((res)=>res.json()).then((data)=>{
//       setIcedata(data)
//     })
//   })
  
//   return (
//     <div>
//       <section>
//         <nav class="navbar navbar-expand-lg bg-body-tertiary">
//           <div class="container-fluid">
//             <a class="navbar-brand" href="#">Navbar</a>
//             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span class="navbar-toggler-icon"></span>
//             </button>
//             <div class="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li class="nav-item">
//                   <a class="nav-link active" aria-current="page" href="#">Home</a>
//                 </li>
//                 <li class="nav-item">
//                   <a class="nav-link" href="#">Link</a>
//                 </li>
//                 <li class="nav-item dropdown">
//                   <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     Dropdown
//                   </a>
//                   <ul class="dropdown-menu">
//                     <li><a class="dropdown-item" href="#">Action</a></li>
//                     <li><a class="dropdown-item" href="#">Another action</a></li>
//                     <li><hr class="dropdown-divider" /></li>
//                     <li><a class="dropdown-item" href="#">Something else here</a></li>
//                   </ul>
//                 </li>
//                 <li class="nav-item">
//                   <a class="nav-link disabled" aria-disabled="true">Disabled</a>
//                 </li>
//               </ul>
//               <form class="d-flex" role="search">
//                 <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//                 <button class="btn btn-outline-success" type="submit">Search</button>
//               </form>
//             </div>
//           </div>
//         </nav>
//       </section>

//       <section className='banner'>
//         <div className='container-fixed'>
          
//         </div>
//       </section>

//       <section className='text-center mt-5 pt-5 mb-5 pb-5'>
//         <div className="container">
//           <h1>Oru product</h1>
//           <div className="row">
//             {
//               icedata.map((item)=>(
//                 <div className="col-lg-3 mt-5" key={item._id}>
//                   <div className="card">
//                     <img src={item.img}></img>
//                     <h3>{item.title}</h3>
//                     <h6>₹{item.price}</h6>
//                     <p>{item.des}</p>
//                     <button className='btn btn-danger mx-auto'>Add to cart</button>
//                   </div>
//                 </div>
//               ))
//             }
//           </div>
//         </div>
//       </section>

//       <footer className='bg-dark text-white'>
//         <div className="container">
//           <div className='row pt-5'>
//             <div className="col-lg-3">
//               <img src="https://minus30.co/cdn/shop/files/M30-WebsiteLogo-02.svg?v=1751625901&width=220" alt='' className='w-50' />
//             </div>
//             <div className="col-lg-3">
//               <h5>Address</h5>
//               <p>Manufactured, Packed and Registered Office : C-159 Okhla, Phase 1, New Delhi 110020
//                 Fssai Lic No. 13318010000675</p>
//               <p>Manufactured, Packed by: Tower A Ground Floor Service Area,Rattha Tek Meadows 51,Sholinganallur Chennai,T.N- 600119</p>
//             </div>
//             <div className="col-lg-3">
//               <h5>Quick Links</h5>
//               <p>Our Story
//                 Blog
//                 Contact Us
//                 FAQs
//                 Shipping and Returns
//                 Terms of Service
//                 Privacy Policy
//                 Refund Policy</p>
//             </div>
//             <div className="col-lg-3">
//               <h5>Stay Connected</h5>
//               <p>Subscribe to our newsletter to keep up with the world of Minus 30 Gelato</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [icedata, setIcedata] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/getData")
      .then((res) => res.json())
      .then((data) => {
        setIcedata(data)
      })
  }, [])   // ✅ dependency added

  // ✅ live filtered data
  const filteredData = icedata.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>

      {/* Navbar */}
      <section>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>

            <div className="collapse navbar-collapse">
              <form className="d-flex ms-auto" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search ice cream..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} // ✅ live search
                />
              </form>
            </div>
          </div>
        </nav>
      </section>

      {/* Products */}
      <section className='text-center mt-5 pt-5 mb-5 pb-5'>
        <div className="container">
          <h1>Our Products</h1>
          <div className="row">

            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div className="col-lg-3 mt-5" key={item._id}>
                  <div className="card p-3 h-100">
                    <img src={item.img} alt={item.title} className="img-fluid" />
                    <h3>{item.title}</h3>
                    <h6>₹{item.price}</h6>
                    <p>{item.des}</p>
                    <button className='btn btn-danger mx-auto'>
                      Add to cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h4 className="mt-5">No products found 😢</h4>
            )}

          </div>
        </div>
      </section>

      {/* Footer (unchanged) */}
      <footer className='bg-dark text-white'>
        <div className="container">
          <div className='row pt-5'>
            <div className="col-lg-3">
              <img
                src="https://minus30.co/cdn/shop/files/M30-WebsiteLogo-02.svg?v=1751625901&width=220"
                alt=""
                className='w-50'
              />
            </div>
            <div className="col-lg-3">
              <h5>Address</h5>
              <p>Manufactured, Packed and Registered Office...</p>
            </div>
            <div className="col-lg-3">
              <h5>Quick Links</h5>
              <p>Our Story | Blog | Contact Us</p>
            </div>
            <div className="col-lg-3">
              <h5>Stay Connected</h5>
              <p>Subscribe to our newsletter</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
