import CopyTo from '../components/Copy/CopyTo';
import { FaCopy } from 'react-icons/fa';
import '../styles/CopySnippet/_CopySnippet.scss';

const CopySnippet = ({ code }) => {
    const [copyToClipboard] = CopyTo();

    const snippet = () => {
        copyToClipboard(code);
    };

    return <FaCopy className="copyBtn" onClick={snippet} />;
};

export default CopySnippet;
