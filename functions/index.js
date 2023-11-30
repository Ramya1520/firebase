const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();
// Configure Nodemailer with your email service provider
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "enquiryspritle@gmail.com",
    pass: "xeuhzsoinngkyeux",
  },
});
const testCollectionName = "production-contact";
exports.sendEmailOnNewDocumentTest = functions.firestore
  .document(`${testCollectionName}/{docId}`)
  .onCreate(async (snap, context) => {
    const newDocument = snap.data();
    const emailClient = newDocument.Email;
    const leadType = newDocument.Leadtype;
    console.log(emailClient);
    console.log(newDocument);
    // if (emailClient != '')
    let subjectClient = "";
    let ccInternal = "";
    switch (leadType) {
      case "SaaSly for Integrations":
        ccInternal = [
          "prabhu.m@spritle.com, surendrans@spritle.com, abinaya.gunasekaran@spritle.com",
        ];
        subjectClient = `spritle- Thank you ${newDocument["First Name"]}, for showing interest in our SaaSly Integrations.`;
        break;
      case "Software Testing services":
        ccInternal = [
          "prabhu.m@spritle.com, karthikeyan.s@spritle.com, surendrans@spritle.com",
        ];
        subjectClient = `spritle- Thank you ${newDocument["First Name"]}, for showing interest in our Software Testing services.`;
        break;
      case "Become our Vendor/Partner":
        ccInternal = [
          "prabhu.m@spritle.com, surendrans@spritle.com, talent.acquisition@spritle.com",
        ];
        subjectClient = `spritle- Thank you ${newDocument["First Name"]}, for showing interest as become a Vendor/partner.`;
        break;
      case "Jobs & Career":
        ccInternal = [
          "prabhu.m@spritle.com, surendrans@spritle.com, kamakshi.s@spritle.com, jobs@spritle.com ",
        ];
        subjectClient = `spritle- Thank you for ${newDocument["First Name"]}, showing interest in our Jobs & Career.`;
        break;
      default:
        ccInternal = ["prabhu.m@spritle.com, surendrans@spritle.com"];
        subjectClient = `spritle- Thank you ${newDocument["First Name"]}, for showing interest in our ${newDocument["Leadtype"]}.`;
        break;
    }
    const textClient = `
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
          <tbody>
          <tr>
            <td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"></tr></td>
              <tr>
                  <td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:500px">
                          <tbody>
                              <tr>
                                  <td align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                          <tbody>
                                              <tr>
                                                  <td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                              </tr>
                                              <tr>
                                                  <td style="padding-bottom: 5px; padding-top:20px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
                              <img src="https://www.spritle.com/assets/img/logo/logo.png" style="width:50%; margin-botttom:22rem;"/><br><br><br><br>
                                                      <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Dear  ${newDocument["First Name"]}</h2>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                                                      <h4 class="text" style="font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;margin:0; padding :2rem;">Thank you for showing interest in exploring Spritle, a world-class software company for people-centric apps. One of our experts will contact you shortly.
      </h4>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                                          <tbody>
                                                              <tr>
                                                                  <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                                      <p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Why <a href="https://www.spritle.com/" style="text-decoration: auto;font-size: 16px;font-weight: 600;color: #175CFF;">Spritle.com?</a>
                                                                      We at Spritle are an interdisciplinary team of coders, analysts, and user experience specialists dedicated to building enterprise applications and premium digital products that bring your ideas to life, delight your users and help you achieve your goals.
                                                                  </td>
                                                              </tr>
                                                          </tbody>
                                                      </table>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                          <tbody>
                                              <tr>
                                                  <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px">
                          <tbody>
                              <tr>
                                  <td align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                          <tbody>
                                              <tr>
                                                  <td style="padding: 0px 10px 10px;" align="center" valign="top" class="footerEmailInfo">
                                                      <p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">If you have any questions please contact us <a href="mailto:info@spritle.com" style="color:#bbb;text-decoration:underline" target="_blank">info@spritle.com</a>
                                                          </p>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                              </tr>
                          </tbody>
                      </table>
                  </td>
              </tr>
          </tbody>
      </table>`;
    const mailOptionsCLient = {
      from: "enquiryspritle@gmail.com",
      to: emailClient,
      cc: ccInternal,
      subject: subjectClient,
      text: `Dear ${newDocument["First Name"]} ${newDocument["Last Name"]}`,
      html: textClient,
    };
    try {
      await transporter.sendMail(mailOptionsCLient);
      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error(`Error sending email to ${email}: ${error}`);
    }
  });
