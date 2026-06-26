import './loader.css';

const Loader = ({ fullscreen = false, label = 'Loading' }) => {
  return (
    <div className={fullscreen ? 'loader-screen' : 'loader-inline'}>
      <div className="loader-spinner" />
      <p>{label}</p>
    </div>
  );
};

export default Loader;
