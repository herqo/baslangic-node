const animationEnd = (function (el) {
  const animations = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'mozAnimationEnd',
    WebkitAnimation: 'webkitAnimationEnd'
  };
  for (const t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
})(document.createElement('div'));

$('#myButton').click((e) => {
  const username = $('#Username').val();
  const email = $('#Email').val();
  const password = $('#Password').val();
  // if (username === '' && email === '' && password === '') {

  const Username = $('#Username');
  const Email = $('#Email');
  const Password = $('#Password');
  const UsernameRemove = Username.one(animationEnd, () => {
    Username.removeClass('animated shake');
  });

  const EmailRemove = Email.one(animationEnd, () => {
    Email.removeClass('animated shake');
  });

  const PasswordRemove = Password.one(animationEnd, () => {
    Password.removeClass('animated shake');
  });

  if (username === '' && password === '' && email === '') {
    e.preventDefault();
    Username.addClass('animated shake');
    Email.addClass('animated shake');
    Password.addClass('animated shake');
    UsernameRemove
    EmailRemove
    PasswordRemove;
    console.log('Denem')
  } else if (username === '' && password !== '' && email !== '') {
    e.preventDefault();
    Username.addClass('animated shake');
    UsernameRemove;
    console.log('burda');
  } else if (username === '' && password === '' && email !== '') {
    e.preventDefault();
    console.log('Usernmae Ve Password alani Bos');
  } else if (username === '' && password !== '' && email === '') {
    e.preventDefault();
    console.log('Username ve Email Alani Bos');
  }

  if (username !== '' && password === '' && email === '') {
    e.preventDefault();
    console.log('Email Ve Password alani Bos');
  } else if (username !== '' && password !== '' && email === '') {
    e.preventDefault();
    console.log('Sadece Email Alani Bos');
  } else if (username !== '' && password === '' && email !== '') {
    e.preventDefault();
    console.log('Sadece Password Alani Bos');
  }

});