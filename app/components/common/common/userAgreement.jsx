/**
 * Created by marszed on 2017/1/24.
 */
import React from 'react';
import {injectIntl} from "react-intl";

class UserAgreement extends React.Component {
    constructor(props) {
        super(props);
    }

    submit = () => (
        this.props.agreementSubmit()
    );

    render() {
        const {messages} = this.props.intl;
        return (<div className={"ipx_pop" + (this.props.hide ? ' hide' : '')}>
                <div className="ipx_pop_box ipx_pop_contract">
                    <div className="ipx_pop_head">
                        <h2 className="float_lf">IPX  – TERMS AND CONDITIONS</h2>
                    </div>
                    <div className="ipx_pop_body">
                        <p >  <br />
                            The website you are using, being <a href="http://www.ipx.net" className="ipxblue_txt">www.ipx.net</a>,  whether accessed via a mobile application, desktop internet browser or mobile  internet browser (&lsquo;<strong>the Website</strong>&rsquo;), is provided by International Property  Exchange Centre Pty Ltd (ACN 159 914 922). IPX&rsquo;s commitment to best practice in  all areas of its activities extends to respecting and safeguarding the privacy  of our clients and partners. <br />
                            Please read these Terms and Conditions (&lsquo;<strong>the  Terms</strong>&rsquo;) carefully as they contains terms of use that are binding on Users  in respect of the User&rsquo;s use of the Website. By continuing to use the Website,  Users accept these Terms in their entirety and agrees to be bound by them. <br />
                            <br /><strong>1. MODIFICATION </strong> <br /><br />
                            1.1 These Terms may be varied, replaced or removed  at the discretion of IPX without further notice to the User. <br />
                            1.2 It is the User&rsquo;s obligation to ensure that the  User has read, understood and agrees to the most recent version of the Terms  available on the Website. The User agrees and acknowledges that the User&rsquo;s  continued use of the Website will amount to renewed acceptance of these Terms  as varied, replaced or removed and agrees to be bound by them on each occasion  that the User accesses the Website. <br />
                            <br /><strong>2. PRIVACY </strong> <br /><br />
                            2.1 The User&rsquo;s use of the Website is governed by  the Privacy Policy. The User agrees to be bound by the Privacy Policy as a condition  of the User&rsquo;s right of access to the Website. The User should read the Privacy  Policy carefully as it applies to personal information that the User provides  through the User&rsquo;s use of the Website, and contains binding terms in respect of  the User&rsquo;s disclosure of personal information. By continuing to use the Website  the User accepts the Privacy Policy and agrees to be bound by the Privacy  Policy where applicable. <br />
                            <br /><strong>3. CONFIDENTIALITY </strong> <br /><br />
                            3.1 IPX is not liable to the User for any breach of  confidentiality resulting from disclosure of the User&rsquo;s Confidential  Information that is not within the reasonable control of IPX (including any  breach to IPX&rsquo;s data security arising from any unauthorised third party access,  intrusion or corruption of any kind to the Website). <br />
                            3.2 The User agrees that any communications between  the User and IPX constitute Confidential Information and that the User will not  disclose such communications to any third party without IPX&rsquo;s prior written  consent.  </p>
                        <p ><br /><strong>4. INTELLECTUAL  PROPERTY </strong> <br /><br />
                            4.1 Title to, and all Intellectual Property Rights  in the Website, the underlying software and code of the Website and any  documentation relating to the Website, including all content, trademarks, trade  names and service marks, remain at all times the property of IPX. <br />
                            4.2 As a user of the Website, the User is not  licensed or authorised to use, reproduce or copy any of the intellectual  property or information and content comprised in the Website, without IPX&rsquo;s  prior written consent <br />
                            <br /><strong>5. ACCEPTABLE USER CONDUCT POLICY </strong> <br /><br />
                            5.1 The User agrees that the User will not: </p>
                        <ol>
                            <li>(a) use the Website except in the  User&rsquo;s personal capacity; </li>
                            <li>(b) use the Website for any purpose  that is improper, unlawful, or to post, share or transmit any material that:
                                <ol>
                                    <li>(i) is defamatory, offensive, obscene or otherwise objectionable; </li>
                                    <li>(ii) is in breach of confidentiality or  privacy or of any third party&rsquo;s Intellectual Property Rights; </li>
                                    <li>(iii) is posted, shared or transmitted  for the purpose of advertising or promoting goods or services (either the  User&rsquo;s own goods or services or the goods or services of any third party)  without the prior written consent of IPX; or </li>
                                    <li>(iv) is misleading or misrepresentative  as to the User&rsquo;s identity or which in any way suggests that the User represent,  are sponsored by, affiliated or connected with IPX; </li>
                                </ol>
                            </li>
                                <li>(c) use the Website except for  legitimate private use or in any manner which may cause damage or cause any  claim to be made against IPX; </li>
                                <li>(d) copy, distribute and/or communicate  the Website in any way that would infringe on IPX&rsquo;s Intellectual Property  Rights; </li>
                                <li>(e) attempt to access any Confidential  Information of third parties or tamper with or circumvent any security  procedures embedded in the Website in any way; </li>
                                <li>(f) attempt to upload any malicious  software to the Website, to any other user of the Website, or to any third  party that hosts any element of the Website, or provides any part of the  Website, including &lsquo;trojan horses&rsquo;, &lsquo;time bombs&rsquo;,&lsquo;worms&rsquo;, denial of service attacks,  viruses, altered code, licence control utilities, software locks or other  harmful codes. </li>
                        </ol>

                        <p >5.2 Some elements of the Website may interface with  external third party websites and resources. The User acknowledges and agrees  that IPX is not responsible or liable for any content or information from such  websites or resources. The User&rsquo;s correspondence and business dealings with  third parties through the use of the Website, including any purchase or sale of  goods or services, are solely between the User and such third party. The User  further acknowledges and agrees that IPX shall not be directly or indirectly  responsible or liable for any loss or damage caused in connection with the use  of these third party websites or resources. <br />
                            5.3 Use of the Website may be subject to  limitations imposed by IPX for any reason. The User agrees and acknowledges  that IPX may, in its absolute discretion, limit or terminate the User&rsquo;s right  of access to use the Website for any reason, and at any time. <br />
                            <br /><strong>6. LINKS TO OTHER WEBSITES </strong> <br /><br />
                            6.1 The Website may contain links to websites,  services and advertisements owned and operated by third parties (&lsquo;<strong>Third  Party Websites</strong>&rsquo;) which are not under the control of IPX. <br />
                            6.2 In relation to the Third Party Websites which are  linked to the Website, IPX: <br /></p>
                        <ol>
                            <li>(a) provides links to other Third Party Websites as a convenience to the User and the existence of links to Third Party Websites which should not be considered as an endorsement, representation or authorisation by IPX of Third Party Websites; and </li>
                            <li>(b) is not responsible for any material  contained on Third Party Websites. </li>

                        </ol>
                        <p>
                            <br /><strong>7. WARRANTIES &amp; ACKNOWLEDGMENTS </strong> <br /><br />
                            7.1 The User acknowledges that:  </p>
                        <ol>
                            <li>(a) the User uses the Website entirely at the User’s own risk;</li>
                            <li>(b) IPX provides no warranty or  guarantee as to the accuracy or currency of Listing Information contained on  the Website; </li>
                            <li>(c) IPX does not provide the User with  any personalised advice for which it may be liable or responsible for to any  individual, under any circumstances; </li>
                            <li>(d) any guidance and/or recommendation  made by IPX is provided generally and IPX has no liability whatsoever for any  such guidance or recommendation or any User’s experience with any goods or services purchased as a result of such guidance or recommendation; and</li>
                            <li>(e) the User is responsible for, and  must pay the cost of, all telecommunications and internet access charges  incurred when using the Website, whether or not such access has been arranged  by IPX. </li>
                        </ol>
                        <p >7.2 The User agrees to: <br /></p>
                        <ol>
                            <li>(a) comply with all of IPX’s reasonable requests relating to these Terms and the use of the Website, including adherence to the general appearance and content of Listing Information uploaded to the Website;</li>
                            <li>(b) ensure that any passwords, pass-codes or other identifiers provided by IPX to the User relating to the Website are kept secure and protected from unauthorised access or use;</li>
                            <li>(c) not bring the Website into disrepute; and</li>
                            <li>(d) not promote any other website, person or service that directly competes with the Website</li>
                        </ol>
                        <p>
                            7.3 IPX gives no warranties about the Website, or  in relation to any products or services offered for sale by or via the Website,  or any of the suppliers who are advertised or promoted on the Website. <br />
                            7.4 IPX gives no guarantee as to the continuous or  fault-free operation of the Website and the Users acknowledge that systems or  technological failure may impede or prevent access to all or any part of the  Website or any Listing Information contained in the Website, and that the  transmission of data over the internet can be subject to errors and delays, all  of which IPX shall not be responsible for. <br />
                            <br /><strong>8. UPLOADING OF LISTINGS </strong> <br /><br />
                            8.1 Subject to conditions contained in the Terms, a  User that is a Developer may be authorised to upload Listing Information to the  Website for the benefit of other Users of the Website. A Developer is  responsible for all Listing Information uploaded by them, to the Website. <br />
                            8.2 Developers agree and acknowledge that the  publication of Listing Information on the Website is at the sole and unfettered  discretion of IPX and that Developers will be required to vary, replace or  remove Listing Information, where directed by IPX to do so. <br />
                            8.3 All Listing Information must contain the  minimum information as stipulated by IPX from time to time.  </p>
                        <p >8.4 Developers agree and acknowledge that they are  solely responsible for all of Listing Information (including any errors  contained therein) <br />
                            8.5 Developers warrant that the Listing  Information: <br />
                            <ol>
                                <li>(a) is accurate, including in relation to:  descriptions; place, personal or other specific names; dates and times;  figures; addresses; and phone and facsimile numbers and email addresses; </li>
                                <li>(b) complies with all laws; </li>
                                <li>(c) is not offensive, defamatory, misleading or  deceptive, or uploaded to the Website for a purpose not contemplated by these  Terms; </li>
                                <li>(d) does not breach any third party&rsquo;s Intellectual  Property rights; </li>
                                <li>(e) will not, by appearing on the Website, expose  IPX to any liability; and </li>
                                <li>(f) does not include any advertisements or  promotions that IPX has not consented to. </li>
                            </ol>
                            8.6 Developers further warrant that they: <br /></p>
                        <p>
                            <ol>
                                <li>(a) are a licensed real estate agent as  defined in section 4 of the <em>Estate Agents Act 1980 </em>(Vic); or </li>
                                <li>(b) are authorised by the owners of the  relevant properties referred to in, and/or the Intellectual Property contained,  in the Listing Information (including any images) to publish or cause to be  published the Listing Information on the website. </li>
                            </ol>
                            8.7 IPX may, in its absolute discretion, provide  technical support or any other relevant support as required, to assist with the  uploading and maintenance of Listing Information. <br />
                            8.8 Whilst IPX will use its best endeavours to  ensure that all details, descriptions, prices and availabilities relating to  the Listing Information which appear on the Website are accurate and current,  errors may occur. Additionally, IPX is not required to monitor or censor the  Listing Information, however IPX may, in its sole discretion, vary, replace or  remove Listing Information on the Website, without notice to the Developer, if  IPX considers that the relevant Listing Information does not comply with these  Terms, or if the variation, replacement or removal is otherwise necessary. <br />
                            <br /><strong>9. LISTING INFORMATION DATABASE </strong><br /> </p>

                        <p >9.1 IPX may maintain a database of Listing  Information and/or any other analytical information collected via IPX&rsquo;s  operation of the Website, including but not limited to &lsquo;cookies&rsquo; (&lsquo;<strong>Database</strong>&rsquo;),  and may exploit, in its sole discretion, for IPX&rsquo;s (or its nominees&rsquo;) benefit,  all Intellectual Property in the Database (&lsquo;<strong>Database IP</strong>&rsquo;). <br />
                            9.2 Developers irrevocably and unconditionally: <br /></p>
                        <ol>
                            <li>(a) assign to IPX (or its nominees) all  Database IP; and </li>
                            <li>(b) to the extent that the Database IP  cannot be assigned, grant IPX (or its nominees) an exclusive, worldwide,  royalty free, fully assignable perpetual licence to use (in any way, including  modifying and recompiling the data), and sublicence others to use, the Database  IP, as and when the Database IP is provided or made available to IPX. </li>
                        </ol>
                        <p>
                            9.3 IPX grants the Developer in relation to the  relevant Listing Information to which the Database IP relates, a non-assignable  bare licence to: </p>
                        <ol>
                            <li>(a) use the relevant Database IP for the  Developer&rsquo;s property development business purposes; and </li>
                            <li>(b) provide the relevant Database IP to third  parties for the purpose of advertising and operating the Developer&rsquo;s property  development business, </li>
                            subject to at all times, that such licence may be  revoked by IPX, at any time, in its sole discretion.
                        </ol>
                        <p><br /><strong>10. AMOUNTS </strong> <br /><br />
                            10.1 All prices and amounts (&lsquo;<strong>Amounts</strong>&rsquo;)  displayed on this Website are current at the time of issue, but may change at  any time and do not reflect the availability of the particular good or service  to which they relate. <br />
                            10.2 All Amounts are expressed in Australian  Dollars unless otherwise stated. <br />
                            10.3 All Amounts may be subject to &lsquo;GST&rsquo; as defined  in the <em>A New Tax System (Products and Services Tax) Act 1999</em>, where the  imposition of GST is applicable. <br/>
                            10.4 The Users acknowledge that all Amounts are  exclusive of any taxes, duties or other liabilities imposed by any governmental  agency that may be applicable to the Amounts, including without limitation, any  customs duty, products and services taxes or any value added tax. <br />
                            <br /><strong>11. REFERRAL AGREEMENT </strong><br/> </p>
                        <p >11.1	In relation to a particular property development for which details are uploaded Listing Information (‘<strong>Development</strong>’), a User that is an Agency type or an Agent type user of the website may enter into a Referral Agreement with IPX, to act as selling agent (‘<strong>Selling Agent</strong>’) or as an introducer of potential purchaser  in relation to the particular Development. <br />
                            11.2	The Users agree and acknowledge that in addition to the specific provisions contained in the relevant Referral Agreement entered into with IPX, these Terms, as they may be amended from to time, will form part of the terms of the Referral Agreement.</p>

                        <p><br /><strong>12. OUR LIABILITY </strong> <br /><br /></p>

                        <p>
                            12.1 To the maximum extent permitted by law, IPX  excludes all liability and responsibility to the User or any other person, for  any loss (including consequential loss of information, Data, or pecuniary loss)  or damage resulting, directly or indirectly, from any use of, or reliance on,  the Website. <br />
                            12.2 To the maximum extent permitted by law, IPX  excludes all liability and responsibility to the User or any other person for  any loss, damage or injury arising from, suffered or incurred, from the use of  a good, product or service purchased via the Website, or for any experience or  service received as a result of the use of a redeemable voucher purchased via the  Website. <br />
                            12.3 To the maximum extent permitted by law, IPX&rsquo;s  liability under any condition or warranty which cannot legally be excluded is  limited to (at IPX&rsquo;s election) supplying the goods, product or service, that  IPX had contracted to supply, again, or paying the cost of having such goods,  product or services supplied again.  </p>
                        <p >12.4 Other than as explicitly provided for by these  Terms, IPX has no liability (including liability in negligence) to the User or  any other person for any loss or damage (consequential or otherwise) however  suffered or incurred in relation to: </p>
                        <ol>
                            <li>(b) the goods, product or service provided, or not  provided, under these Terms; </li>
                            <li>(c) any operational failure or unavailability of  the Website; </li>
                            <li>(d) any contamination of, or defect in, the Listing  Information introduced by virus, latent defect, human or other error, or  otherwise; </li>
                            <li>(e) the User&rsquo;s reliance on any material contained  on, or accessed through, the Website; or </li>
                            <li>(f) any delay or failure in loading the Listing  Information onto the Website. </li>
                        </ol>
                        <p>12.5	In circumstances not covered by clauses 12.3 and 12.4, the maximum total amount which the User may recover from IPX (whether in contract, tort, under statute or otherwise) will be negotiated between IPX and the User in good faith.  <br />
                            <br /><strong>13. DISCLAIMERS AND RELEASE </strong> <br /><br />
                            13.1 To the full extent permitted by law, IPX makes  no warranty (express or implied) or guarantee or any representation that the  Website and any information contained or referred to on the Website: </p>
                        <ol>
                            <li>(a) will meet a User’s requirements; or</li>
                            <li>(b) will be available to a User on an uninterrupted, timely, secure, or error-free basis; or</li>
                            <li>(c) will be accurate, reliable, free of viruses or errors or defects, complete, legal or safe.</li>
                        </ol>
                        <p>
                            13.2 Access to, and use of the Website is at the  User&rsquo;s own discretion and risk. The User accept the full cost of any necessary  repair, correction and maintenance of any of the User&rsquo;s computer or mobile  software or hardware, which may be necessary as a consequence of accessing  and/or using the Website. <br />
                            13.3 IPX will not be liable under any circumstances  for any loss or damage of any kind recognised by law (even if it has been  advised of the possibility of such loss or damage) incurred as a result of:  </p>
                        <ol>
                            <li>(a) acting, or failing to act, on any information contained in or referred to on the Website;</li>
                            <li>(b) using or acquiring, or their  inability to use or acquire, goods and services listed on the Website; </li>
                            <li>(c) any interactions between Users of  the Website. </li>
                        </ol>
                        <p >13.4 IPX will not be liable to the User or any  third party for any lost profit or any indirect, consequential, exemplary,  incidental, special or punitive damages arising from or relating to any matter  that has arisen or arises directly or indirectly out of, or relates directly or  indirectly to: </p>
                        <ol>
                            <li>(a) the User&rsquo;s use, or inability to  use, the Website; </li>
                            <li>(b) any interactions or transactions of  the User with, or any act or omission in relation to other Users; </li>
                            <li>(c) delays to, interruptions of or  cessation of services provided in the Website; </li>
                            <li>(d) defamatory, offensive or illegal  conduct of any Users. </li>
                            <li>(e) whether caused through negligence  of the Website, its employees or independent contractors, or through any other  cause. </li>
                        </ol>
                        <p>
                            <br /><strong>14. INDEMNITY </strong> <br /><br />
                            14.1 To the fullest extent permitted by law, the  User agrees to defend, indemnify and hold harmless IPX, its officers,  directors, employees, contractors, agents or related bodies corporate (as that  term is defined in the <em>Corporations Act 2001 </em>(Cth)) for any liabilities,  claims, demands, losses, costs and expenses (including without limitation legal  costs), or for any direct, indirect, incidental, special, punitive or  consequential damages, whatsoever, resulting from:  </p>
                        <p >&nbsp;</p>

                        <ol>
                            <li>(a) the User&rsquo;s use of and access to the  Website , including any data or content transmitted or received by the User, or  any Listing Information that is uploaded to the Website by a Developer; </li>
                            <li>(b) the User&rsquo;s violation of IPX&rsquo;s  intellectual property rights; </li>
                            <li>(c) the User&rsquo;s Listing Information; </li>
                            <li>(d) the User&rsquo;s interaction with any  other User; </li>
                            <li>(e) the User&rsquo;s violation of any thirty  party right, including any Intellectual Property Rights; </li>
                            <li>(f) any breach of the User&rsquo;s  obligations under these Terms; </li>
                            <li>(g) any breach of the warranties  provided by the User under these Terms; </li>
                            <li>(h) any act, omission or misconduct or  negligence of the User or the User&rsquo;s employees, officers or agents in  connection with these Terms or the Website; </li>
                            <li>(i) any claims brought by or on behalf  of any third party relating to an act or omission by the User relating to the  Listing Information or any Intellectual Property Rights relating to the Listing  Information; or </li>
                            <li>(j) any other scenario contemplated by  these Terms. </li>
                        </ol>

                        <p >14.2 The indemnities referred to in this Clause 14  shall survive the termination of these Terms. <br />
                            <br /><strong>15. NON-CIRCUMVENTION </strong> <br /><br />
                            15.1 The User agrees to not, and ensure that its  Associated Entities do not, make commercial or other use of the Listing  Information of other Users contained on the Website, without the prior express  written consent of IPX. <br />
                            15.2 The User agrees to not, and shall ensure that  its Associated Entities do not, contact any officer, customer, supplier or  employee of the other Users or their Associated Entities to discuss any matter,  including but not limited to the Listing Information of other Users or their  operations, affairs, business or strategies, other than with the prior express  written consent of IPX. <br />
                            15.3 The User undertakes in favour of the Discloser  that without the prior knowledge and express written consent of IPX, it:  </p>
                        <ol>
                            <li>(a)  will not, and will ensure that each of its Associated Entities do not, directly  or indirectly, contact, communicate, deal with or otherwise become involved  with any person or entity (whether or not such person or entity is introduced  directly or indirectly by or through IPX and the Website) for the purpose of:
                                <ol>
                                    <li>(i) avoiding or hindering any person from executing a Referral Agreement or  similar binding documentation or otherwise establishing or terminating binding  relations with IPX (or its Associated Entities); or </li>
                                    <li>(ii)  pursuing or undertaking an arrangement similar to that contemplated under a  Referral Agreement for its own benefit and/or with any other person or entity  without the involvement of IPX; or </li>
                                    <li>(iii) bringing a Referral Agreement to  an end; </li>
                                </ol>
                            </li>
                            <li>(b) will not, and will ensure that each  of its Associated Entities do not, make any use of the Listing Information, any  other information or content contained on the Website, or any part of it to the  commercial, financial or competitive disadvantage of IPX or any of its  Associated Entities; and </li>

                            <li>(c) will not, and will ensure that each  its Associated Entities do not use the Listing Information, or any advantages  derivable from the Listing Information in their own business or affairs. </li>

                        </ol>
                        <p ><br /><strong>16. TERMINATION </strong> <br /> <br />
                            16.1 IPX may terminate the agreement constituted by  these Terms (&lsquo;<strong>the Agreement</strong>&rsquo;) on thirty (30) days&rsquo; prior written notice  to the User, at any time and for any reason. <br />
                            16.2 The User may terminate the Agreement on ninety  (90) days&rsquo; prior written notice to IPX. <br />
                            16.3 IPX may immediately terminate the Agreement on  written notice to the User if: <br /></p>
                        <ol>
                            <li>(a) the User commits a breach of these  Terms which IPX considers is not rectifiable; </li>
                            <li>(b) the User fails to rectify a breach  of these Terms which IPX considers is rectifiable within seven (7) days of  receiving a written notice from IPX specifying the breach and requiring the  User to rectify it; or </li>
                            <li>(c) the Listing Information, or any  other content or data uploaded to the Website is defamatory, breaches any law  or is false or misleading. </li>
                        </ol>
                        <p>
                            16.4 On termination of the Agreement IPX may  immediately remove all of the Listing Information from the Website and deny the  access to the website without prior notice to the User. <br />
                            16.5 The termination of the Agreement does not  affect the User&rsquo;s or IPX&rsquo;s rights as against each other that would otherwise  have arisen pursuant to the Agreement in respect of any past breach of the  Agreement. <br />
                            <br /><strong>17. GENERAL </strong> <br /><br />
                            17.1 These Terms, together with the Privacy Policy  and the terms of any other notices or instructions given to the User under  these Terms supersede and extinguish all prior agreements, representations  (whether oral or written), and understandings and constitute the entire  agreement between the User and IPX relating to the Website and the other  matters dealt with in these Terms. <br />
                            17.2 If either party waives any breach of these  Terms, this will not constitute a waiver of any other breach. No waiver will be  effective unless made in writing.  </p>
                        <p >17.3 Neither party will be liable for any delay or  failure in performance of its obligations under these Terms if the delay or  failure is due to any cause outside its reasonable control. This clause does  not apply to any obligation to pay money. <br />
                            17.4 The User may not assign or transfer any rights  to any other person without IPX&rsquo;s prior written consent. <br />
                            17.5 These Terms are governed by the laws of  Victoria, Australia. The parties agrees to submit to the non-exclusive  jurisdiction of the Courts of Victoria, and Courts entitled to hear appeals  from these Courts. <br />
                            17.6 If any part or provision of these Terms is  invalid, unenforceable or in conflict with any applicable law, that part or  provision is deemed to have been removed or varied to the extent of the  inconsistency. The remainder of these Terms will be binding on the parties. <br />
                            17.7 Any notice given under these Terms by either  party to the other must be in writing by email and will be deemed to have been  given on transmission. <br />
                            <ol>
                                <li>(a)	Notices to IPX must be sent to: <br/>
                                    office@ipx.net <br/>
                                    or to any other email address notified to the User by IPX.
                                </li>
                                <li>(b)	Notices to the User will be sent to the email address which the User provided. </li>
                            </ol>

                            17.8 A person who is not a party to these Terms has  no right to benefit under or to enforce any term of these Terms. <br />
                            <br /><strong>18. DEFINITIONS </strong> <br /><br />
                            In these Terms, the following words have the  following meanings unless stated otherwise: <br />
                            <br/><strong>Associated Entities </strong>means,  in relation to a party, Related Bodies Corporate and Associates of that party. <br />
                            <br/><strong>Associate </strong>has the meaning  given to it in section 318 of the <em>Income Tax Assessment Act 1936 </em>(Cth). <br />
                            <br/><strong>Confidential Information </strong>means  any information identified as being of a confidential nature, or that would be  reasonably understood to be of a confidential nature. <br />
                            <br/><strong>Data </strong>means any data  uploaded by the User or with the User&rsquo;s authority into the Website, including  the User&rsquo;s personal information.  <br />
                            <br/><strong>Developer </strong>means  a User which is granted access to the Website via a &lsquo;Developer&rsquo; user account. <br />
                            <br/><strong>Intellectual Property Rights </strong>means any patent, trade mark, service mark, copyright, moral right, right in a design, know-how and any other intellectual or industrial property rights, anywhere in the world whether or not registered or capable of registration.<br />
                            <br/><strong>IPX </strong>or <strong>we </strong>or <strong>us </strong>means International Property Exchange Centre Pty Ltd (ACN 159 914  922), being the provider of the Website. <br />
                            <br/><strong>Listing Information </strong>means  all data comprised in any and all information and content that a User submits  to, or uses with, the Website or otherwise provided to IPX under these Terms. <br />
                            <br/><strong>Privacy Policy </strong>means  IPX&rsquo;s Privacy Policy, accessible from the Website. <br />
                            <br/><strong>Referral Agreement </strong>means an agreement to be entered into between a User and IPX, under which the User agrees to act as selling agent or an introducer of potential purchaser, in conjunction with IPX in relation to properties, whose information is contained in the Listing Information.<br />
                            <br/><strong>Related Bodies Corporate </strong>has  the meaning given to that expression in the <em>Corporations Act 2001 </em>(Cth). <br />
                            <br/><strong>Terms </strong>means these  Terms and Conditions of the Website. <br />
                            <br/><strong>User </strong>means a person  who uses the Website or any of the services available on the Website. <br />
                            <br/><strong>User Content </strong>means  any and all information and content that a User submits to, or uses with, the  Website, including but not limited to Listings. <br />
                            <br/><strong>Website </strong>means IPX  website found at <a href="http://www.ipx.net" className="ipxblue_txt">www.ipx.net</a>, whether accessed via a mobile application,  desktop internet browser or mobile internet browser. </p>
                    </div>
                    <div className="ipx_pop_foot align_ct">
                        <button onClick={this.submit} className="ipx_btn ipx_M_btn ipx_blue_btn width20per">{messages.ensure}</button>
                    </div>
                </div>
                <div className="ipx_pop_bg"></div>
            </div>);
    }
}

export default injectIntl(UserAgreement);
