const usernameIsLongEnough = (username) => {
  return username.toLowerCase().split(' ').join('').length >= 6;
};

const passwordIsLongEnough = (password) => {
  return password.length >= 6;
};

const emailIsCorrectlyFormatted = (email) => {
  const emailRegEx = /\S+@\S+\.\S+/;
  return emailRegEx.test(email);
};

const emailIsUnique = (email, existingEmails) => {
  return !existingEmails.includes(email);
};

const usernameIsUnique = (username, existingUsernames) => {
  return !existingUsernames.includes(username);
};

const passwordFieldsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

const validateNewUser = (newUser, usersArray) => {

  const existingUsernames = Object.values(usersArray).reduce((usernameArray, user) => {
    usernameArray.push(user.username.toLowerCase().split(' ').join(''));
    return usernameArray;
  }, []);

  const existingEmails = Object.values(usersArray).reduce((emailArray, user) => {
    emailArray.push(user.email.toLowerCase().split(' ').join(''));
    return emailArray;
  }, []);

  const validationTests = [
    usernameIsLongEnough(newUser.username),
    passwordIsLongEnough(newUser.password),
    emailIsCorrectlyFormatted(newUser.email),
    emailIsUnique(newUser.email, existingEmails),
    usernameIsUnique(newUser.username, existingUsernames),
    passwordFieldsMatch(newUser.password, newUser.confirmPassword),
  ];

  return validationTests.reduce((failedIndices, currentTest, currentIndex) => {
    if (currentTest !== true) failedIndices.push(currentIndex);
    return failedIndices;
  }, []);
};

const getTestFailFeedback = (testIndex) => {
  const testFailMessages = [
    'Username must contain at least 6 characters (not including spaces).',
    'Password must contain at least 6 characters.',
    'Email address is not correctly formatted.',
    'Email address is already in use.',
    'Username is not unique.  Usernames are case and space insensitive.',
    'Password fields do not match.',
  ];

  return testFailMessages[testIndex];
};

export { validateNewUser };
export { getTestFailFeedback };
