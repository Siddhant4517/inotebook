import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark">
      <div className="container text-center">
      <section className="p-3 pt-0">
        <div className="row d-flex align-items-center">
          <div className="col-md-7 col-lg-8 text-center text-md-start">
            <div className="p-3 text-white ">
              iNoteBook | © 2024 Copyright: iNotebook.com 
            </div>
          </div>
          <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end" style={{margin:"8px 0px 0px 0px"}}>
            <a href="https://www.instagram.com/siddhant_4718/?next=%2F" className='mx-3' target='_blank'>
            <ion-icon name="logo-instagram" size="large"></ion-icon>
            </a>
            <a href="https://github.com/Siddhant4517" target='_blank'>
            <ion-icon name="logo-github" size="large"></ion-icon>
            </a>
          </div>
        </div>
      </section>
      </div>
    </footer>
  );
};

export default Footer;