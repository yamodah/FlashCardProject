import React from "react";
import {Link} from "react-router-dom"

function NavBar(){
return(<nav aria-label="breadcrumb">
<ol class="breadcrumb">
  <li class="breadcrumb-item"><Link href="#">Home</Link></li>
  <li class="breadcrumb-item"><a href="#">Library</a></li>
  <li class="breadcrumb-item active" aria-current="page">Data</li>
</ol>
</nav>)
}

export default NavBar