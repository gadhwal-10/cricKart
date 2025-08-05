import React, { useEffect, useState } from "react";
import "../AdminStyles/UpdateRole.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, removeErrors, removeSuccess, updateUserRole } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function UpdateRole() {
  const { userId } = useParams();
  const { user, success, loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  useEffect(()=>{
    dispatch(getSingleUser(userId))
  },[dispatch])
  const { name, email, role } = formData;
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(updateUserRole({userId,role}))
  }
    useEffect(()=>{
        if(success){
            toast.success("User Role Updated Successfully",{position:'top-center',autoClose:3000});
            dispatch(removeSuccess())
            navigate('/admin/users')
        }
      if(error){
        toast.error(error.message,{position:'top-center',autoClose:3000});
        dispatch(removeErrors())
      }
    },[dispatch,error,success])
  return (
    <>
      <Navbar />
      <PageTitle title="Update User Role" />
      <div className="page-wrapper">
        <div className="update-user-role-container">
          <h1>Update User Role</h1>
          <form className="update-user-role-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" readOnly value={name} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                readOnly
                value={email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select name="role" id="role" required value={role} onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="btn btn-primary">Update Role</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UpdateRole;
