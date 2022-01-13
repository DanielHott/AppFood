import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ index, url }) {
  const [hasCopied, setHasCopied] = useState(false);
  const id = index >= 0 ? `${index}-horizontal-share-btn` : 'share-btn';

  const copyToClipboard = () => {
    const URL = window.location.href.replace('/in-progress', ''); // ref.: 1 e 2
    const URl = !url ? URL : url;
    navigator.clipboard.writeText(URl); // ref.: 3, 4 e 5
    setHasCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ copyToClipboard }
      >
        { hasCopied
          ? 'Link copiado!'
          : <img data-testid={ id } src={ shareIcon } alt="share icon" />}
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  index: PropTypes.string.isRequired,
  url: PropTypes.string,
};

ShareButton.defaultProps = {
  url: '',
};

export default ShareButton;

// ref.: 1) https://www.devmedia.com.br/javascript-replace-substituindo-valores-em-uma-string/39176
// ref.: 2) https://qastack.com.br/programming/1865837/whats-the-difference-between-window-location-and-window-location-replace
// ref.: 3) https://developer-mozilla-org.translate.goog/en-US/docs/Web/API/Clipboard/writeText?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=sc
// ref.: 4) https://developer-mozilla-org.translate.goog/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=sc
// ref.: 5) https://stackoverflow-com.translate.goog/questions/69438702/why-does-navigator-clipboard-writetext-not-copy-text-to-clipboard-if-it-is-pro?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=sc
