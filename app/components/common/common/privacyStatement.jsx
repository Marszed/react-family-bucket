/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {injectIntl} from "react-intl";

class PrivacyStatement extends React.Component {
    constructor(props) {
        super(props);
    }

    submit = () => (
        this.props.privacySubmit()
    );

    render() {
        const {messages} = this.props.intl;
        return (<div className={"ipx_pop" + (this.props.hide ? ' hide' : '')}>
            <div className="ipx_pop_box ipx_pop_contract">
                <div className="ipx_pop_head">
                    <h2 className="float_lf">PRIVACY POLICY</h2>
                </div>
                <div className="ipx_pop_body">
                    <p> The  website you are using, being <a href="http://ipx.net" className="ipxblue_txt">www.ipx.net</a>, whether accessed via a mobile  application, desktop internet browser or mobile internet browser (&lsquo;<strong>the  Website</strong>&rsquo;), is provided by International Property Exchange Centre Pty Ltd  (ACN 159 914 922) (<strong>&lsquo;IPX</strong>&rsquo;, &lsquo;<strong>we</strong>&rsquo; or &lsquo;<strong>us</strong>&rsquo;). IPX&rsquo;s commitment  to best practice in all areas of its activities extends to respecting and  safeguarding the privacy of our clients and partners. <br />
                        This  Privacy Policy (&lsquo;<strong>this Policy</strong>&rsquo;) applies to your use of the Website and  explains how your Personal Information is collected, stored, used and disclosed  by us. Please take the time to familiarise yourself with this Policy, together  with the Terms and Conditions of the Website (&lsquo;<strong>the Terms and Conditions</strong>&rsquo;). <br />
                        All  Personal Information collected and otherwise dealt with by IPX, is governed by  the Australian Privacy Principles (&lsquo;<strong>the APPs</strong>&rsquo;) contained in Schedule 1  of the <em>Privacy Act 1988 </em>(Cth) as amended (&lsquo;<strong>the Privacy Act</strong>&rsquo;).  Whenever collecting and dealing with your Personal Information we will be bound  by the APPs. <br />
                        If  you have any questions about how IPX collects or uses Personal Information,  please refer to the contact details contained in section 14 of this Policy. <br /></p>
                    <p>
                        <br />
                        <br /><strong>1.  SCOPE </strong> <br /><br />
                        1.1  This Policy applies to the collection, holding and use of Personal Information  provided about individuals to IPX through the use of the Website. <br />
                        1.2  Your use of the Website and any of our services available on the Website, and  any dispute over privacy, is subject to this Policy and the Terms and  Conditions, including its applicable limitations on damages and the resolution  of disputes. The Terms and Conditions are incorporated by reference into this  Policy. <br /><br />
                        <br /><strong>2.  ACKNOWLEDGEMENT </strong> <br /><br />
                        2.1  It is a condition of your use of the Website or any of our services available  on the Website that you acknowledge and agree that you have had the opportunity  to read and agree to this Policy and that you consent to IPX collecting and  holding your Personal Information subject to the terms of this Policy and the  Terms and Conditions. <br />
                        2.2  By continuing to use the Website or using any of our services available on the  Website you acknowledge that you have had the opportunity to read this Policy  and acknowledge and consent to IPX collecting and holding Personal Information  supplied by you through your use of the Website and retaining and/or using  Personal <br />
                        Information provided by you subject  to the terms of this Policy, and the Terms and Conditions. <br />
                        2.3  Whilst IPX makes every effort to keep your Personal Information private as  required by law, you acknowledge and agree that IPX is not liable for, and you  indemnify IPX against, any action, claim or damage of any kind resulting from  the use of your Personal Information. <br />
                        2.4  You further acknowledge and agree that IPX makes no warranties or  representations to you about the use of your Personal Information by third  parties as a result of your use of the Website, and you agree that your use of  the Website and disclosure of your Personal Information to us is at your own risk. <br /><br />
                        <br /><strong>3.  PURPOSE </strong> <br /><br />
                        3.1  The purpose of this Policy is to: </p>
                    <ol>
                        <li>(a) clearly communicate the Personal Information handling  practices of IPX, </li>
                        <li>(b) enhance the transparency of IPX&rsquo;s Personal Information  collection processes, and </li>
                        <li>(c) give individuals a better and more complete understanding  of the sort of Personal Information that IPX holds, and the way IPX handles  that Personal Information. </li>
                    </ol>
                    <p><br /><strong>4.  PERSONAL INFORMATION </strong> <br /><br />
                        4.1  In this Policy, <em>&lsquo;Personal Information&rsquo; </em>has the same meaning as defined  by section 6 of the Privacy Act: <br />
                        <em>&lsquo;information  or an opinion (including information or an opinion forming part of a database),  whether true or not, and whether recorded in a material form or not, about an  individual whose identity is apparent, or can reasonably be ascertained, from  the information or opinion.&rsquo; </em> <br />
                        4.2  Personal Information may include your name, address, telephone number, email  address and/or other information that is necessary for the delivery of our  services to you. <br />
                        <br /><strong>5.  COLLECTION </strong> <br /><br />
                        5.1  In the course of regular business activity, IPX may be required to collect and  otherwise deal with your Personal Information as described in this Policy.  </p>

                    <p>5.2  If you do not want any of your data collected, you can stop using the Website,  or any of our services available on the Website at any time (subject to any  applicable Terms and Conditions). <br />
                        5.3  IPX collects your Personal Information in numerous ways, including when: <br /></p>
                    <ol>
                        <li>(a) you use the Website or any of our services available on  the Website; </li>
                        <li>(b) you email IPX staff members for any reason, including  inquiries and complaints; </li>
                        <li>(c) you telephone IPX; or </li>
                        <li>(d) you provide IPX with Personal Information, whether  directly or indirectly via an intermediary. </li>
                    </ol>
                    <p>
                        5.4  IPX does not generally take steps to: <br /></p>
                    <ol>
                        <li>(a) verify Personal Information about any individual disclosed to it; or</li>
                        <li>(b) seek additional Personal Information about any individual on the basis of Personal Information disclosed to it,</li>
                    </ol>
                    <p>
                        except  in circumstances where it is reasonably necessary for IPX to confirm the  identity of an individual seeking access to Personal Information. <br />
                        5.5  When collecting Personal Information from you – whether it be via the Website,  email or in hardcopy form – we will take reasonable steps to inform you of why  we are collecting the Personal Information, the purposes for which we intend to  use that Personal Information and to whom it may be disclosed. <br />
                        5.6  To ensure we are meeting the needs and requirements of our Website users, and  to continue to develop our online services, we collect aggregated information  through the use of cookies. We use cookies to collect data about your visit and  to allow you to navigate from page to page without having to reload each time.  You can refuse cookies by using the appropriate setting on your browser,  however, if you do so you may not be able to access portions of our Website.  The information we store in cookies shall not be linked to any personally  identifiable information you submit while on our Website, however we may also  use this data to tailor advertisements to you. The use of cookies by our  partners, affiliates, and service providers is not covered by this Policy. We  do not have access or control over these cookies. Our partners, affiliates, and  service providers use session ID cookies to collect data about your visit and  to tailor and deliver advertising messages to you. </p>


                    <p><br /><strong>6.  USE </strong> <br /><br />
                        6.1  Any Personal Information collected by IPX will be used for the purposes for  which it was given to IPX, for purposes which are directly related to those  purposes, or for purposes which you have otherwise consented to. <br />
                        6.2  Without limiting the generality of the foregoing, IPX may also use your  Personal Information for the following purposes: <br /></p>
                    <ol>
                        <li>(a) to contact you regarding transaction specific inquiries, </li>
                        <li>(b) to send you promotional or other information about IPX or  events organised by or related to IPX through email, postal mail or some other  means; </li>
                        <li>(c) to provide direct marketing services to you; </li>
                        <li>(d) to send you communications in connection with our  products and/or services; </li>
                        <li>(e) to conduct research about our products and/or services; </li>
                        <li>(f) to monitor and improve our products and/or services; </li>
                        <li>(g) to allow IPX to personalise our services; or </li>
                        <li>(h) to process any inquiries you have about the IPX. </li>
                    </ol>
                    <p>
                        <br /><strong>7.  DISCLOSURE </strong> <br />
                        7.1  We may disclose Personal Information we hold to our directors, officers,  employees and other associated companies within our corporate group for  business purposes or marketing or remarketing purposes through our Website or  other social media channels. <br />
                        7.2  We may also disclose Personal Information to service providers or contractors  who help us provide services (for example, marketing or remarketing purposes  through our Websites or other social media channels). Where applicable Personal  Information is shared with these third parties, they are obliged to observe the  confidential nature of such Personal Information and are prohibited from using  any or all of this Personal Information other than for the purpose for which it  was provided. We will also disclose Personal Information to a law enforcement  agency if we are requested to do so by that agency in relation to suspected  unlawful activity. <br />
                        7.3  IPX does not otherwise provide Personal Information to any other organisations,  government agencies, or other third parties except in accordance with the terms  of use for the Website in the following circumstances: </p>

                    <ol>
                        <li>(a) the individual has consented to their Personal  Information being disclosed, </li>
                        <li>(b) the individual would reasonably expect, or has been told,  that their Personal Information will be passed to a recipient third party, </li>
                        <li>(c) the disclosure of an individual&rsquo;s Personal Information is  otherwise required or authorised by law, </li>
                        <li>(d) it is legally compelled to do so, under any law or by  court order. </li>
                    </ol>

                    <p>&nbsp;</p><br />
                    <p>7.4  At all times, we will take reasonable steps to ensure your Personal Information  is protected and treated confidentially, and in accordance with the Privacy  Act. In applicable instances, disclosure of Personal Information will be  undertaken in strict accordance with the Privacy Act. This includes  circumstances where the user has been informed and granted permission or  disclosure is required under any Australian law and regulations. <br />
                        <br /><strong>8.  DIRECT MARKETING </strong> <br /><br />
                        8.1  IPX may collect and use Personal Information for the purposes of IPX and/or  third parties providing direct marketing services to users of the Website. If a  person does not wish for their Personal Information to be used for direct  marketing purposes they may contact IPX at any time and instruct IPX to cease or  refrain from using their Personal Information for direct marketing purposes.  Contact details for IPX are contained in section 14 of this Policy. <br />
                        8.2  Alternatively, when making purchases or registering with IPX you may elect to <em>&lsquo;opt  out&rsquo; </em>of receiving direct marketing from IPX or other third parties. <br />
                        <br /><strong>9.  ACCESS </strong> <br /><br />
                        9.1  In situations where IPX holds Personal Information about you, pursuant to APP  12 you are entitled to be given access to such Personal Information by making a  written request to IPX (subject to some exceptions). <br />
                        9.2  If you would like access to your Personal Information please make a written  request. Contact details are contained in section 14 of this Policy. <br />
                        9.3  IPX will respond to a request for access to Personal Information within a  reasonable period after the request is made. <br />
                        <br /><strong>10.  CORRECTION </strong> <br /><br />
                        10.1  Pursuant to APP 13, in the event IPX holds Personal Information about you and; </p>

                    <ol>
                        <li>(a) IPX is satisfied that the Personal Information is  inaccurate, out of date, incomplete, irrelevant or misleading; or </li>
                        <li>(b) you request the Personal Information be corrected, </li>
                    </ol>

                    <p>IPX  will take reasonable steps to correct the Personal Information to ensure that  it is accurate, up to date, relevant and not misleading. <br />
                        10.2  If your personal details need to be corrected please make a written request for  correction to using the Contact details contained in section 14 of this Policy <br />
                        <br /><strong>11.  SECURITY </strong> <br /><br />
                        11.1  IPX has processes in place to ensure the security of your Personal Information,  including encryption of all data when it is transferred to our service  providers and limitations on access to Personal Information within our  organisation. IPX will take all reasonable steps to ensure your Personal  Information is protected from misuse, interference, loss and unauthorised access,  modification or disclosure. <br />
                        <br /><strong>12.  EXTERNAL WEBSITES </strong> <br /><br />
                        12.1  Please note the Website contains links to other external websites. IPX is not  affiliated with these sites and accordingly has no control over – and is not  responsible for – their content, privacy practice or other policies. <br />
                        <br /><strong>13.  MODIFICATION </strong> <br /><br />
                        13.1  Please note that we reserve our right to vary, replace or remove this Policy  without further notice to you. If this Policy is varied, replaced or removed,  such changes will not affect the Personal Information previously disclosed by  you. <br />
                        13.2  You should check this page regularly to take notice of any changes we may have  made to this Policy. It is your obligation to ensure that you have read,  understood and agree to the most recent version of this Policy available on the  Website. You agree and acknowledge that your continued use of the Website will  amount to renewed acceptance of this Policy as varied, replaced or removed and  agree to be bound by this Policy on each occasion that you access the Website. <br />
                        <br /><strong>14.  CONTACT </strong> <br /><br />
                        14.1  Your privacy is very important to us. For that reason, if you have any  questions or concerns about how IPX safeguards your privacy, or if you wish to  access or amend Personal Information we hold about you, please make a request  in writing.  </p>

                    <p>14.2  All correspondence should be directed to: <br />
                        <em>The  Privacy Officer </em> <br />
                        <em>International  Property Exchange Centre Pty Ltd </em> <br />
                        <em>7/668  Burwood Road </em> <br />
                        <em>Hawthorn  East VIC 3123 </em> <br />
                        OR <br />
                        <em>office@ipx.net </em> <br />
                        <br /><strong>15.  COMPLAINTS </strong> <br /><br />
                        15.1  If IPX does not agree to provide access to Personal Information or to amend or  annotate the Personal Information it holds about an individual, the individual  can: <br /></p>
                    <ol>
                        <li>(a) escalate their enquiry to IPX to a formal complaint in  writing or by email, or </li>
                        <li>(b) pursue the matter further with the Office of the  Australia Information Commissioner (&lsquo;<strong>OAIC</strong>&rsquo;). </li>
                    </ol>
                    <p>
                        15.2  If an individual has a complaint about any practice, procedure or action taken  in regard to their Personal Information, they may apply to the OAIC to  investigate the complaint. The OAIC may be contacted at: <br />
                        Online:  http://www.oaic.gov.au/about-us/contact-us-page <br />
                        By  Phone: 1300 363 992 (Aus) or + 61 2 9284 9749 (International). <br />
                        By  Email: enquiries@oaic.gov.au <br />
                        By  Fax: +61 2 9284 9666 <br />
                        By  Post: GPO Box 5218 Sydney NSW 2001 <br />
                        <br /><strong>16.  ANONYMITY </strong> <br /><br />
                        16.1  A person may choose to deal with IPX anonymously. However, in circumstances  where a person requests details about Personal Information held by IPX, they  may be required to provide sufficient details to confirm their identity, to  ensure that no unauthorised person is provided with access to Personal  Information. <br />
                        16.2 IPX does not  disclose Personal Information to any person whose identity cannot be verified. </p>
                </div>
                <div className="ipx_pop_foot align_ct">
                    <button onClick={this.submit} className="ipx_btn ipx_M_btn ipx_blue_btn width20per">{messages.ensure}</button>
                </div>
            </div>
            <div className="ipx_pop_bg"></div>
        </div>);
    }
}

export default injectIntl(PrivacyStatement);
