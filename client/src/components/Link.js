import { Link as RouterLink, useLocation } from 'react-router-dom';

const Link =  ({ href, children, className = '', label = 'Untitled' }) => {
  const location = useLocation();

  var styles = `${className}`;
  if (location.pathname === href)
    styles += ' active';
  
  return <RouterLink to={href} className={styles} style={{ textDecoration: 'none' }}>{children || label}</RouterLink>
};

export default Link;