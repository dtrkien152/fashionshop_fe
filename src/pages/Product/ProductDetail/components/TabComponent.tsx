import  { useState } from 'react';

const TabComponent = () => {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <div className="row" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">
            <div className="col-12">
                <div className="cr-paking-delivery">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('description')}
                                    type="button" role="tab">
                                Description
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${activeTab === 'information' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('information')}
                                    type="button" role="tab">
                                Information
                            </button>
                        </li>
                        {/*<li className="nav-item" role="presentation">*/}
                        {/*    <button className={`nav-link ${activeTab === 'review' ? 'active' : ''}`}*/}
                        {/*            onClick={() => setActiveTab('review')}*/}
                        {/*            type="button" role="tab">*/}
                        {/*        Review*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                    </ul>
                    <div className="tab-content">
                        {activeTab === 'description' && <DescriptionTab />}
                        {activeTab === 'information' && <InformationTab />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabComponent;

// DescriptionTab.js
export const DescriptionTab = () => (
    <div className="cr-tab-content">
        <div className="cr-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente odio, error dolore...</p>
        </div>
        <h4 className="heading">Packaging & Delivery</h4>
        <div className="cr-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero perferendis dolor...</p>
        </div>
    </div>
);

// InformationTab.js
export const InformationTab = () => (
    <div className="cr-tab-content">
        <div className="cr-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero sapiente...</p>
        </div>
        <div className="list">
            <ul>
                <li><label>Brand <span>:</span></label>ESTA BETTERU CO</li>
                <li><label>Flavour <span>:</span></label>Super Saver Pack</li>
                <li><label>Diet Type <span>:</span></label>Vegetarian</li>
                <li><label>Weight <span>:</span></label>200 Grams</li>
                <li><label>Speciality <span>:</span></label>Gluten Free, Sugar Free</li>
                <li><label>Info <span>:</span></label>Egg Free, Allergen-Free</li>
                <li><label>Items <span>:</span></label>1</li>
            </ul>
        </div>
    </div>
);

// // ReviewTab.js
// export const ReviewTab = () => (
//     <div className="cr-tab-content-from">
//         <div className="post">
//             <div className="content">
//                 <img src={IMAGES.review.image1} alt="review" />
//                 <div className="details">
//                     <span className="date">Jan 08, 2024</span>
//                     <span className="name">Oreo Noman</span>
//                 </div>
//                 <div className="cr-t-review-rating">
//                     <i className="ri-star-s-fill"></i>
//                     <i className="ri-star-s-fill"></i>
//                     <i className="ri-star-s-fill"></i>
//                     <i className="ri-star-s-fill"></i>
//                     <i className="ri-star-s-fill"></i>
//                 </div>
//             </div>
//             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in vero
//                 sapiente odio, error dolore vero temporibus consequatur, nobis veniam odit
//                 dignissimos consectetur quae in perferendis
//                 doloribusdebitis corporis, eaque dicta, repellat amet, illum adipisci vel
//                 perferendis dolor! Quis vel consequuntur repellat distinctio rem. Corrupti
//                 ratione alias odio, error dolore temporibus consequatur, nobis veniam odit
//                 laborum dignissimos consectetur quae vero in perferendis provident quis.</p>
//         </div>
//
//         <h4 className="heading">Add a Review</h4>
//         <form>
//             <div className="cr-ratting-star">
//                 <span>Your rating :</span>
//                 <div className="cr-t-review-rating">
//                     <i className="ri-star-s-fill"></i>
//                     <i className="ri-star-s-fill"></i>
//                     <i className="ri-star-s-line"></i>
//                     <i className="ri-star-s-line"></i>
//                     <i className="ri-star-s-line"></i>
//                 </div>
//             </div>
//             <input name="your-name" placeholder="Name" type="text" />
//             <input name="your-email" placeholder="Email*" type="email" required />
//             <textarea name="your-comment" placeholder="Enter Your Comment"></textarea>
//             <button className="cr-button" type="submit">Submit</button>
//         </form>
//     </div>
// );
