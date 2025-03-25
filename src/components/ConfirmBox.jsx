import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';

const ConfirmBox = ({ confirm, cancel, handleConfirm, cancelConfirm }) => {
  return (
    <div className='w-screen h-screen bg-slate-800/80 fixed top-0 left-0 flex justify-center items-center'>
      <div className='w-96 h-20 bg-white flex gap-4 p-4 rounded-md'>
        <PrimaryButton content={confirm} onClick={() => handleConfirm()} />
        <SecondaryButton content={cancel} onClick={() => cancelConfirm()} />
      </div>
    </div>
  );
};

export default ConfirmBox;
