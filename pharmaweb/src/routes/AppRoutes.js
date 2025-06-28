import { Routes, Route } from 'react-router-dom';
import Home from '../page/Home';
import AboutUs from '../page/AboutUs';
import ContactUs from '../page/ContactUs';
import QuoteUs from '../page/QuoteUs';
import Product from '../page/Product';
import ProductDetails from '../page/ProductDetails';
import Tablet from '../page/Tablet';
import LiquidFilling from '../page/LiquidFilling';
import Career from '../page/Career';
import Login from '../page/login';
import JobApplication from '../page/JobApplication';
import Register from '../page/Register';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProductAdmin from '../page/Admin/Product';
import Dashboard from '../page/Admin/Dashboard';
import MockUsers from '../page/Admin/MockUsers';
import Feedback from '../page/Admin/Feedback';
import Quote from '../page/Admin/Quote';
import AdminTablet from '../page/Admin/AdminTablet';
import AdminLiquidFilling from '../page/Admin/AdminLiquidFilling';
import AddProduct from '../page/Admin/AddProduct';
import AddTablet from '../page/Admin/AddTablet';
import AddLiquidFilling from '../page/Admin/AddLiquidFilling';
import AdminCareer from '../page/Admin/AdminCareer';
import AddCareer from '../page/Admin/AddCareer';
import CareerApplicants from '../page/Admin/CareerApplicants';
import FeedbackForm from '../page/Admin/FeedbackForm';
import MyCV from '../page/MyCV';
import ViewCV from '../page/Admin/ViewCV';
import AdminRoute from '../components/AdminRoute';
import { useAuthData } from '../stores';
import Profile from '../page/Profile';
import CvApprover from '../page/Admin/CvApprover';
import ForgotPassword from '../page/ForgotPassword ';
import ResetPassword from '../page/ResetPassword';
const AppRoutes = () => {
    const { authData } = useAuthData(); // ← thêm dòng này
    return (
        <Routes>
            {/* Layout user */}
            <Route element={<UserLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/quoteus" element={<QuoteUs />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/tablet" element={<Tablet />} />
                <Route path="/liquidfilling" element={<LiquidFilling />} />
                <Route path="/career" element={<Career />} />
                <Route path="/mycv" element={<MyCV />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/jobapplication/:jobId" element={<JobApplication />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
            </Route>
            {/* <Route element={<AdminRoute authData={authData} />}> */}
            <Route element={<AdminLayout />}>
                <Route path="/adminproduct" element={<ProductAdmin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/mockusers" element={<MockUsers />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="/admintablet" element={<AdminTablet />} />
                <Route path="/adminliquidfilling" element={<AdminLiquidFilling />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/addtablet" element={<AddTablet />} />
                <Route path="/addliquidfilling" element={<AddLiquidFilling />} />
                <Route path="/admincareer" element={<AdminCareer />} />
                <Route path="/addcareer" element={<AddCareer />} />
                <Route path="/careerapplicants" element={<CareerApplicants />} />
                <Route path="/feedbackform" element={<FeedbackForm />} />
                <Route path="/editcareer/:id" element={<AddCareer />} />
                <Route path="/editliquidfilling/:id" element={<AddLiquidFilling />} />
                <Route path="/editproduct/:id" element={<AddProduct />} />
                <Route path="/addtablet/:id" element={<AddTablet />} />
                <Route path="/careerapplicants/:jobId" element={<CareerApplicants />} />
                <Route path="/cvapprover/:jobId" element={<CvApprover />} />
                <Route path="/cv/view/:id" element={<ViewCV />} />
            </Route>
            {/* </Route> */}
        </Routes>
    );
};
export default AppRoutes;
