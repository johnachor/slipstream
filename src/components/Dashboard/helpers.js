import firebase from 'firebase';

// filters the list of friend requests for only those which are relevant to the current user
const filterForSelfAndFriends = (friendReq) => {
  return firebase.auth().currentUser.uid === friendReq.senderUid || firebase.auth().currentUser.uid === friendReq.receiverUid;
};

// puts firebase IDs on request objects
const addKeyNameToObjects = (acc, kvp) => {
  kvp[1].firebaseId = kvp[0];
  acc.push(kvp[1]);
  return acc;
};

const getUidsOfCurrentUsersFriends = (accArray, currentReq) => {
  if (currentReq.senderUid === firebase.auth().currentUser.uid) {
    accArray.push(currentReq.receiverUid);
  } else {
    accArray.push(currentReq.senderUid);
  }
  return accArray;
};

export default { filterForSelfAndFriends, addKeyNameToObjects, getUidsOfCurrentUsersFriends };
