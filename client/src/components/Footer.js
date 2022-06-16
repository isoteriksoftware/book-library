import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ExternalLink from "./ExternalLink";
import Link from './Link';

const Root = styled('div')(({ theme }) => ({
  padding: '3rem 6rem',
  background: '#1E1E1E',
  position: 'absolute',
  bottom: 0,
  [theme.breakpoints.only('xs')]: {
    padding: '3rem 1.5rem',
  },

  '& .logo': {
    [theme.breakpoints.only('xs')]: {
      width: '60%'
    },
  },
  '& .body': {
    color: '#FCFCFC',
    fontSize: '1.1rem',
    lineHeight: '35px',
    marginTop: '1.5rem'
  },
  '& .social': {
    display: 'flex',
    alignItems: 'center',
    columnGap: '2rem',
    marginTop: '2.5rem',

    '& .handle': {
      '& .icon': {
        transition: '.2s ease',
      },
      
      '&:hover': {
        '& .icon': {
          filter: 'invert(94%) sepia(100%) saturate(0%) hue-rotate(180deg) brightness(103%) contrast(98%)',
          transition: '.2s ease',
        }
      }
    }
  },
  '& .header': {
    fontWeight: 700,
    color: '#FCFCFC',
    marginBottom: '1.5rem',
    fontSize: '1.6rem'
  },
  '& .copyright': {
    textAlign: 'center',
    fontWeight: 400,
    color: '#FCFCFC',
    marginTop: '6rem',
    fontSize: '1rem'
  }
}));

const FooterLink = ({ href, label }) => {
  const Root = styled('div')(({ theme }) => ({
    marginBottom: '.8rem',

    '& .link': {
      display: 'inline-block',
    },
    '& .label': {
      color: '#FCFCFC',
      transition: '.2s ease',
      fontSize: '1.1rem',
      fontWeight: 500,

      '&:hover': {
        transition: '.2s ease',
        color: theme.palette.primary.main
      }
    }
  }));

  return (
    <Root>
      <Link href={href} className="link">
        <Typography variant="h6" className="label">{label}</Typography>
      </Link>
    </Root>
  );
};

const Footer = () => {
  return (
    <Root>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={4} className="col1">
          <Typography variant="h4" className="title" style={{ color: 'white' }}>Book Library</Typography>
          <Typography variant="h6" className="body">9jadelivery offers on-demand delivery and courier service for businesses</Typography>

          <div className="social">
            <ExternalLink href="https://www.facebook.com" className="handle">
              <img src="/imgs/facebook.svg" alt="Facebook" className="icon"/>
            </ExternalLink>
            <ExternalLink href="#" className="handle">
              <img src="/imgs/twitter.svg" alt="Twitter" className="icon"/>
            </ExternalLink>
            <ExternalLink href="https://www.instagram.com" className="handle">
              <img src="/imgs/instagram.svg" alt="Instagram" className="icon"/>
            </ExternalLink>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h4" className="header">About</Typography>

          <FooterLink href="/about" label="About Us"/>
          <FooterLink href="/terms" label="Terms & Conditions"/>
          <FooterLink href="/policies" label="Privacy Policies"/>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h4" className="header">Company</Typography>

          <FooterLink href="/blog" label="Blog"/>
          <FooterLink href="/faqs" label="FAQs"/>
          <FooterLink href="/contact" label="Contact Us"/>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h4" className="header">Get in Touch</Typography>
          <Typography variant="h6" className="body">Questions or Feedbacks? We will love to hear from you.</Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" className="copyright">
        &copy; {new Date().getFullYear()} Book Library. All rights reserved
      </Typography>
    </Root>
  );
};

export default Footer;