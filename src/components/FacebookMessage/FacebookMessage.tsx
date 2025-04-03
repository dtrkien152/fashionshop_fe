import * as React from 'react';

interface Props {
  pageId: string;
}

const FacebookMessage: React.FC<Props> = (props) => {
  const messengerLink = `https://m.me/${props.pageId}`;

  return (
    <a href={messengerLink} className="back-to-top result-placeholder">
      <i className="ri-messenger-line"></i>
      <div className="back-to-top-wrap">
      </div>
    </a>
  );
};

export default FacebookMessage;
