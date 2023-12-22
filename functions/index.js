const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
require("dotenv").config();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

exports.sendEmailOnCreate = functions.firestore
  // send email to professionals on profile creation
  .document("users/{docID}")
  .onCreate((snapshot, ctx) => {
    const userData = snapshot.data();
    const authData = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      // port: 465,
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
        ciphers: "SSLv3",
      },
      requireTLS: true,
    });
    authData
      .sendMail({
        from: "admin@ehkidshealth.com",
        to: "info@ehkidshealth.com",
        subject: "A new professional just signed up!",
        text: `Hi! 
        ${userData && userData.first_name} ${userData &&
          userData.last_name} created profile with email: ${userData &&
          userData.email}. 

      Follow the link to review the profile.
      https://ehkidshealth.com/user/${userData && userData.id}`,
        html: `Hi! <br /> ${userData && userData.first_name} ${userData &&
          userData.last_name} created profile with email: ${userData &&
          userData.email}. <br/>
      Follow the link to review the profile.
      https://ehkidshealth.com/user/${ctx.params.docID}
      <br/> <br/> Thank You!`,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    authData
      .sendMail({
        from: "admin@ehkidshealth.com",
        to: userData && userData.email,
        subject: "THANK YOU for being an EVERYDAY HERO!",
        text: `Hi
        ${userData && userData.first_name} ${userData &&
          userData.last_name}! Thank you for joining us. Your profile has been created on Everyday Heroes Kids (EHK). It will be available on the EHK website for public viewing once we review and approve it.

      You can visit your profile at: 
      https://ehkidshealth.com/user/${ctx.params.docID}
      
        We are very excited to welcome you to the Everyday Heroes Kids Community. Please share the below post 
        on your social media to help us spread the word.
        I have just joined Everyday Heroes Kids, an organization that connects families to pediatric 
        professionals and organizations in health, mental health and education with the goal of saving time, 
        money and stress. They want to make it easier for caregivers to connect to the professional services 
        they are looking for and also the ones they didn’t know existed to facilitate earlier intervention for
        better outcomes in kids! EHK was founded by a team of professionals who are parents of children who 
        have a variety of health or educational needs. To create a professional profile go to 
        www.ehkidshealth.com

        Here is an email to share with colleagues:
        Dear Everyday Hero,
        We are writing to invite you to create a free profile that represents your services on a new 
        pediatric platform, Everyday Heroes Kids (EHK). EHK connects caregivers to pediatric professionals 
        across health, mental health and education with the goal of saving time, money and stress for families. 
        By improving access to care, EHK eases the stress of families and encourages earlier intervention for 
        better outcomes.

        It takes 10-20 minutes to create a free profile and is easy to do...it is similar to creating a 
        Linkedin profile!  When caregivers visit the EHK platform, they search under a diagnosis/concern 
        or by professional type or name and then can further refine their search using advanced filters, 
        such as city or languages spoken. The wonderful advantage to this approach is that families will 
        be presented with all the professionals that treat a concern; both the ones they are looking for 
        and also, the professional services they may not have known existed. 
        
        You can create your profile at https://www.ehkidshealth.com/ 
        
        Currently, our team is working with several government organizations to build a template to 
        support non-profit services and hospitals. We are also developing strategic partnerships with 
        Holland Bloorview Hospital and Sick Kids’ ABOUTKIDSHEALTH.ca. 

        Please contact us if you would like to discuss this opportunity further and please also share with 
        your colleagues and clients.

        Thank you,
        Tammany & Pam
        Everyday Heroes Kids
        Tam@ehkidshealth.com
        Pam@ehkidshealth.com
        
        Tammany Petrie, the founder, is the mom to a son born profoundly deaf and another son with ADHD. 
        She is a former Sick Kids volunteer, a resident in the Biomedical Zone at St. Michael’s Hospital 
        and a long time pediatric entrepreneur.
        Pam Aasen, Community Manager, is the mom of 2 sons with Usher syndrome, which has affected their vision, 
        hearing and vestibular system. Pam is a former special education teacher and has been involved in the 
        advocacy world for many years in many different roles.`,

        html: `Hi
        ${userData && userData.first_name} ${userData &&
          userData.last_name}! <br/> Thank you for joining us. Your profile has been created on 
          Everyday Heroes Kids (EHK). It will be available on the EHK website for public viewing once we review and 
          approve it.
          <br/> <br/>
        <h4>We are very excited to welcome you to the Everyday Heroes Kids Community. 
        Please <u>share the below post on your social media</u> to help us spread the word.
        </h4>
        <br /><br />
        I have just joined Everyday Heroes Kids, an organization that connects families to pediatric 
        professionals and organizations in health, mental health and education with the goal of saving time, 
        money and stress. They want to make it easier for caregivers to connect to the professional services 
        they are looking for and also the ones they didn’t know existed to facilitate earlier intervention for 
        better outcomes in kids! EHK was founded by a team of professionals who are parents of children who 
        have a variety of health or educational needs. To create a professional profile go to www.ehkidshealth.com
        <br/> <br/>
        <h4><u>Here is an email to share with colleagues:</u>
        </h4>
        <br/><br/>
        Dear Everyday Hero,
        <br/><br/>
        We are writing to invite you to create a free profile that represents your services on a new 
        pediatric platform, Everyday Heroes Kids (EHK). EHK connects caregivers to pediatric professionals 
        across health, mental health and education with the goal of saving time, money and stress for families. 
        By improving access to care, EHK eases the stress of families and encourages earlier intervention for 
        better outcomes.
        <br/><br/>
        It takes 10-20 minutes to create a free profile and is easy to do...it is similar to creating a 
        Linkedin profile!  When caregivers visit the EHK platform, they search under a diagnosis/concern or 
        by professional type or name and then can further refine their search using advanced filters, 
        such as city or languages spoken. The wonderful advantage to this approach is that families will 
        be presented with all the professionals that treat a concern; both the ones they are looking for 
        and also, the professional services they may not have known existed.
        <br/><br/>
        You can create your profile at https://www.ehkidshealth.com/
        <br/><br/>
        Currently, our team is working with several government organizations to build a template to support 
        non-profit services and hospitals. We are also developing strategic partnerships with Holland 
        Bloorview Hospital and Sick Kids’ ABOUTKIDSHEALTH.ca.
        <br/><br/>
        Please contact us if you would like to discuss this opportunity further and please also share with your 
        colleagues and clients.
        <br/><br/>
        Thank you,
        <br/><br/>
        Tammany & Pam
        <br/><br/>
        <b>Everyday Heroes Kids</b>
        <br/><br/>
        Tam@ehkidshealth.com
        <br/><br/>
        Pam@ehkidshealth.com
        <br/><br/>
        Tammany Petrie, the founder, is the mom to a son born profoundly deaf and another son with ADHD. 
        She is a former Sick Kids volunteer, a resident in the Biomedical Zone at St. Michael’s Hospital 
        and a long time pediatric entrepreneur.
        <br/><br/>
        Pam Aasen, Community Manager, is the mom of 2 sons with Usher syndrome, which has affected their 
        vision, hearing and vestibular system. Pam is a former special education teacher and has been 
        involved in the advocacy world for many years in many different roles.
        <br/><br/>`,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

exports.sendEmailOnUpdate = functions.firestore
  .document("users/{docID}")
  .onUpdate((change, ctx) => {
    const prevData = change.before.data();
    const updatedData = change.after.data();
    if (prevData.approved !== updatedData.approved) {
      const authData = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
          user: SENDER_EMAIL,
          pass: SENDER_PASSWORD,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
          ciphers: "SSLv3",
        },
        requireTLS: true,
      });
      authData
        .sendMail({
          from: "admin@ehkidshealth.com",
          to: updatedData && updatedData.email,
          subject: "Your Profile is live!",
          text: `Hi
        ${updatedData && updatedData.first_name} ${updatedData &&
            updatedData.last_name}! Your profile is approved. 

      You can visit your profile at: 
      https://ehkidshealth.com/user/${updatedData && updatedData.id}
      Thank You!`,
          html: `Hi
        ${updatedData && updatedData.first_name} ${updatedData &&
            updatedData.last_name}! <br/> Your profile is approved. <br/>

      You can visit your profile at: 
      https://ehkidshealth.com/user/${updatedData && updatedData.id}<br/><br/>
        
      Thank You!`,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

exports.sendEmailOnCreateOrg = functions.firestore
  // send email to professionals on profile creation
  .document("organizations/{docID}")
  .onCreate((snapshot, ctx) => {
    const userData = snapshot.data();
    const authData = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      // port: 465,
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
        ciphers: "SSLv3",
      },
      requireTLS: true,
    });
    authData
      .sendMail({
        from: "admin@ehkidshealth.com",
        to: "info@ehkidshealth.com",
        subject: "A new organization just signed up!",
        text: `Hi! 
        ${userData && userData.name} created profile with email: ${userData &&
          userData.email}. 

      Follow the link to review the profile.
      https://ehkidshealth.com/org/${userData && userData.id}`,
        html: `Hi! <br /> ${userData && userData.name} created profile with email: ${userData &&
          userData.email}. <br/>
      Follow the link to review the profile.
      https://ehkidshealth.com/org/${ctx.params.docID}
      <br/> <br/> Thank You!`,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    authData
      .sendMail({
        from: "admin@ehkidshealth.com",
        to: userData && userData.email,
        subject: "THANK YOU for being an EVERYDAY HERO!",
        text: `Hi
        ${userData && userData.name}! Thank you for joining us. Your organization&#39;s profile has been created on Everyday Heroes Kids (EHK). It will be available on the EHK website for public viewing once we review and approve it.

      You can visit your profile at: 
      https://ehkidshealth.com/org/${ctx.params.docID}
      
      We are very excited to welcome your team to the Everyday Heroes Kids Community. Please share the below post on your social media to help us spread the word.
      We have just joined Everyday Heroes Kids, an organization that connects families to pediatric
      professionals and organizations in health, mental health and education with the goal of saving
      time, money and stress. They want to make it easier for caregivers to connect to the
      professional services they are looking for and also the ones they didn’t know existed to
      facilitate earlier intervention for better outcomes in kids! EHK was founded by a team of
      professionals who are parents of children who have a variety of health or educational needs. To
      create a professional profile go to www.ehkidshealth.com
      Here is an email to share with your members:

      Dear Everyday Hero,

      We are writing to invite you to create a free profile that represents your services on a new
      pediatric platform, Everyday Heroes Kids (EHK). EHK connects caregivers to pediatric
      professionals across health, mental health and education with the goal of saving time, money
      and stress for families. By improving access to care, EHK eases the stress of families and
      encourages earlier intervention for better outcomes.

      It takes 10-20 minutes to create a free profile and is easy to do...it is similar to creating a
      Linkedin profile! When caregivers visit the EHK platform, they search under a
      diagnosis/concern or by professional type or name and then can further refine their search
      using advanced filters, such as city or languages spoken. The wonderful advantage to this
      approach, is that families will be presented with all the professionals that treat a concern; both
      the ones they are looking for and also, the professional services they may not have known
      existed.

      You can create your profile at https://www.ehkidshealth.com/

      Currently, our team is working with several government organizations to build a template to
      support non-profit services and hospitals. We are also developing strategic partnerships with
      Holland Bloorview Hospital and Sick Kids’ ABOUTKIDSHEALTH.ca. 
      Please contact us if you would like to discuss this opportunity further and please also share with
      your colleagues and clients.
      Thank you,

      Tammany & Pam
      Everyday Heroes Kids
      Tam@ehkidshealth.com
      Pam@ehkidshealth.com

      Tammany Petrie, the founder, is the mom to a son born profoundly deaf and another son with
      ADHD. She is a former Sick Kids volunteer, a resident in the Biomedical Zone at St. Michael’s
      Hospital and a long time pediatric entrepreneur.

      Pam Aasen, Community Manager, is the mom of 2 sons with Usher syndrome, which has
      affected their vision, hearing and vestibular system. Pam is a former special education teacher
      and has been involved in the advocacy world for many years in many different roles.
`,
        html: `Hi
        ${userData && userData.name}! <br/> Thank you for joining us. Your organization&#39;s profile has been created on Everyday Heroes Kids (EHK). It will be available on the EHK website for public viewing once we review and approve it.
        <br/> <br/>
        <h4>We are very excited to welcome your team to the Everyday Heroes Kids Community. Please share the below post on your social media to help us spread the word.</h4>
        <br /><br />
        We have just joined Everyday Heroes Kids, an organization that connects families to pediatric 
        professionals and organizations in health, mental health and education with the goal of saving time, 
        money and stress. They want to make it easier for caregivers to connect to the professional services 
        they are looking for and also the ones they didn’t know existed to facilitate earlier intervention 
        for better outcomes in kids! EHK was founded by a team of professionals who are parents of children
        who have a variety of health or educational needs. To create a professional profile go 
        to www.ehkidshealth.com
        <br/> <br/>
        <h4><u>Here is an email to share with your members:</u>
        </h4>
        <br/><br/>
        Dear Everyday Hero,
        <br/><br/>
        We are writing to invite you to create a free profile that represents your services on a new 
        pediatric platform, Everyday Heroes Kids (EHK). EHK connects caregivers to pediatric professionals 
        across health, mental health and education with the goal of saving time, money and stress for families. 
        By improving access to care, EHK eases the stress of families and encourages earlier intervention 
        for better outcomes.
        <br/><br/>
        It takes 10-20 minutes to create a free profile and is easy to do...it is similar to creating a 
        Linkedin profile!  When caregivers visit the EHK platform, they search under a diagnosis/concern 
        or by professional type or name and then can further refine their search using advanced filters, 
        such as city or languages spoken. The wonderful advantage to this approach, is that families will 
        be presented with all the professionals that treat a concern; both the ones they are looking for 
        and also, the professional services they may not have known existed. 
        <br/><br/>
        You can create your profile at https://www.ehkidshealth.com/
        <br/><br/>
        Currently, our team is working with several government organizations to build a template to 
        support non-profit services and hospitals. We are also developing strategic partnerships with 
        Holland Bloorview Hospital and Sick Kids’ ABOUTKIDSHEALTH.ca. 
        <br/><br/>
        Please contact us if you would like to discuss this opportunity further and please also share 
        with your colleagues and clients.
        <br/><br/>
        Thank you,
        <br/><br/>
        Tammany & Pam
        <br/><br/>
        <b>Everyday Heroes Kids</b>
        <br/><br/>
        Tam@ehkidshealth.com
        <br/><br/>
        Pam@ehkidshealth.com
        <br/><br/>
        Tammany Petrie, the founder, is the mom to a son born profoundly deaf and another son with ADHD. 
        She is a former Sick Kids volunteer, a resident in the Biomedical Zone at St. Michael’s Hospital 
        and a long time pediatric entrepreneur.
        <br/><br/>
        Pam Aasen, Community Manager, is the mom of 2 sons with Usher syndrome, which has affected their vision, 
        hearing and vestibular system. Pam is a former special education teacher and has been involved in the 
        advocacy world for many years in many different roles.
        <br/><br/>
        `,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

exports.sendEmailOnUpdateOrg = functions.firestore
  .document("organizations/{docID}")
  .onUpdate((change, ctx) => {
    const prevData = change.before.data();
    const updatedData = change.after.data();
    if (prevData.approved !== updatedData.approved) {
      const authData = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
          user: SENDER_EMAIL,
          pass: SENDER_PASSWORD,
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
          ciphers: "SSLv3",
        },
        requireTLS: true,
      });
      authData
        .sendMail({
          from: "admin@ehkidshealth.com",
          to: updatedData && updatedData.email,
          subject: "Your Profile is live!",
          text: `Hi
        ${updatedData && updatedData.name}! Your profile is approved. 

      You can visit your profile at: 
      https://ehkidshealth.com/org/${updatedData && updatedData.id}
      Thank You!`,
          html: `Hi
        ${updatedData && updatedData.name}! <br/> Your profile is approved. <br/>

      You can visit your profile at: 
      https://ehkidshealth.com/org/${updatedData && updatedData.id}<br/><br/>
        
      Thank You!`,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

exports.getHomepageData = functions.https.onRequest(async (request, response) => {
  const cities = [];
  const users = [];
  const orgs = [];
  try {
    const pC = await admin.firestore().collection("cities").limit(5).get();
    const pU = await admin.firestore().collection("users").limit(5).get();
    const pO = await admin.firestore().collection("organizations").limit(5).get();
    pC.forEach((doc) => {
      const newDoc = doc.data();
      cities.push(newDoc);
    });
    pU.forEach((doc) => {
      const newDoc = doc.data();
      users.push(newDoc);
    });
    pO.forEach((doc) => {
      const newDoc = doc.data();
      orgs.push(newDoc);
    });
    const pMany = [cities, users, orgs];
    const finalPromise = Promise.all(pMany);
    finalPromise.then((results) => {
      response.set("Access-Control-Allow-Origin", "*");
      response.status(200).send(results);
    });
  } catch (error) {
    console.log(error, "error cities");
    response.set("Access-Control-Allow-Origin", "*");
    response.status(500).send(error);
  }
});
exports.GetDataFromFirebase = functions.https.onRequest(async (request, response) => {
  const cities = [];
  const users = [];
  const lang = [];
  const diag = [];
  const spec = [];
  // const orgs: any = [];

  try {
    const pC = await admin.firestore().collection("cities").get();
    const pU = await admin.firestore().collection("users").get();
    // const pU = await admin.firestore().collection("users")
    //     .where("id", "==", "DysLizwtpy2nBPN9vbKK").get();
    const pL = await admin.firestore().collection("languages").get();
    const pD = await admin.firestore().collection("diagnoses").get();
    const pS = await admin.firestore().collection("specialities").get();
    // const pO = await admin.firestore().collection("organizations").get();
    pC.forEach((doc) => {
      const newDoc = doc.data();
      cities.push(newDoc);
    });
    pU.forEach((doc) => {
      const newDoc = doc.data();
      users.push(newDoc);
    });
    pL.forEach((doc) => {
      const newDoc = doc.data();
      lang.push(newDoc);
    });
    pD.forEach((doc) => {
      const newDoc = doc.data();
      diag.push(newDoc);
    });
    pS.forEach((doc) => {
      const newDoc = doc.data();
      spec.push(newDoc);
    });
    // pO.forEach((doc: any) => {
    //   const newDoc: any = doc.data();
    //   orgs.push(newDoc);
    // });
    const pMany = [cities, users, lang, diag, spec];
    const finalPromise = Promise.all(pMany);
    finalPromise.then((results) => {
      response.set("Access-Control-Allow-Origin", "*");
      response.send(results);
    });
  } catch (error) {
    console.log(error, "error cities");
    response.set("Access-Control-Allow-Origin", "*");
    response.status(500).send(error);
  }
});




