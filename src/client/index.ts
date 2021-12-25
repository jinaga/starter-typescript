import { JinagaBrowser } from 'jinaga';
import { User, UserName } from '@shared/model/user';
import { Domain, Visit } from '@shared/model/visit';

const j = JinagaBrowser.create({
  httpEndpoint: '/jinaga'
});

(async () => {
  const { userFact: user, profile } = await j.login<User>();

  // Query for the user's current name.
  const names = await j.query(user, j.for(UserName.forUser));
  if (names.length !== 1 || names[0].value != profile.displayName) {
    // Set their name if it is not set, in conflict, or different.
    await j.fact(new UserName(user, profile.displayName, names));
  }

  // Record this user's visit.
  const domain = new Domain('myapplication');
  await j.fact(new Visit(domain, user, new Date()));

  // Query for all past visits so that we can display the count.
  const visits = await j.query(domain, j.for(Visit.inDomain));
  const message = `You are visitor number ${visits.length}.`;
  const paragraph = document.createElement('p');
  paragraph.innerText = message;
  document.body.appendChild(paragraph);
})();
