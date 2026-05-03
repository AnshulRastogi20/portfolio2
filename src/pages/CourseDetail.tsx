import { Navigate } from "react-router-dom";

// Courses are now managed from the admin panel and displayed on /courses
// Individual course pages redirect to external links set in admin
const CourseDetail = () => {
  return <Navigate to="/courses" replace />;
};

export default CourseDetail;
