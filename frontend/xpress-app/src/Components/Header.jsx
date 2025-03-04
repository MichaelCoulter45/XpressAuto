import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // New state for profile dropdown

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleServicesDropdown = (e) => {
    e.preventDefault();
    setServicesDropdownOpen(!servicesDropdownOpen);
    if (profileDropdownOpen) setProfileDropdownOpen(false); // Close profile dropdown if open
  };

  // New function to toggle profile dropdown
  const toggleProfileDropdown = (e) => {
    e.preventDefault();
    setProfileDropdownOpen(!profileDropdownOpen);
    if (servicesDropdownOpen) setServicesDropdownOpen(false); // Close services dropdown if open
  };

   // Updated function to handle opening maps with your specific address
    const handleOpenMaps = () => {
    // Business address and coordinates
    const address = "2425 Atlantic Ave, Atlantic City, NJ 08401";
    const latitude = 39.3571342;
    const longitude = -74.4417163;
    
    // Check if the device is running iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    let mapsUrl;
    if (isIOS) {
      // Use Apple Maps for iOS devices
      mapsUrl = `http://maps.apple.com/?daddr=${encodeURIComponent(address)}&ll=${latitude},${longitude}&dirflg=d`;
    } else {
      // Use Google Maps for other devices
      mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=ChIJA8e8LmfulIkRI7Ig6viyRoY&travelmode=driving`;
      // Alternative using address: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&travelmode=driving`;
    }
    
    // Open the map in a new tab/window
    window.open(mapsUrl, '_blank');
  };


  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="logo">
        <Link to="/"> 
          <span className="logo-highlight">Express Auto Care</span>
        </Link>
      </div>
      
      
      
      <nav className={mobileMenuOpen ? "nav-active" : ""}>
        <ul>
          <li>
            <Link to="/" className={isActive("/") ? "active-link" : ""}>Home</Link>
          </li>
          <li className="dropdown">
            <a 
              href="#" 
              className={servicesDropdownOpen ? "dropdown-active" : ""}
              onClick={toggleServicesDropdown}
            >
              Services <span className="dropdown-arrow">▾</span>
            </a>
            <div className={`dropdown-menu ${servicesDropdownOpen ? "show" : ""}`}>
              <Link to="/services/oil-change">Oil Change</Link>
              <Link to="/services/tire-service">Tire Service</Link>
              <Link to="/services/brake-service">Brake Service</Link>
              <Link to="/services/diagnostics">Diagnostics</Link>
            </div>
          </li>
          {user ? (
            // Show profile dropdown when user is logged in
            <li className="dropdown">
              <a 
                href="#" 
                className={profileDropdownOpen ? "dropdown-active" : ""}
                onClick={toggleProfileDropdown}
              >
                Profile <span className="dropdown-arrow">▾</span>
              </a>
              <div className={`dropdown-menu ${profileDropdownOpen ? "show" : ""}`}>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Edit Profile</Link>
                <a href="#" onClick={handleLogout}>Logout</a>
              </div>
            </li>
          ) : (
            // Show these links when user is NOT logged in
            <>
              <li>
                <Link to="/login" className={isActive("/login") ? "active-link" : ""}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={isActive("/register") ? "active-link" : ""}>
                  Register
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/about" className={isActive("/about") ? "active-link" : ""}>
              About Us
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="header-actions">
        <button className="icon-button" aria-label="Search">
          <i className="fa-solid fa-search"></i>
        </button>
        <button className="icon-button" aria-label="Contact">
          <i className="fa-solid fa-phone"></i>
        </button>
        <button 
          className="icon-button" 
          aria-label="Get Directions"
          onClick={handleOpenMaps}
          title="Get Directions"
        >
          <i className="fa-solid fa-location-dot"></i>
        </button>
        {user && (
          <div className="user-avatar">
            <span>{user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}</span>
          </div>
        )}
         <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      </div>
    </header>
  );
}

export default Header;