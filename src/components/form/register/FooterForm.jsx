import useDarkMode from '../../../hooks/useDarkMode';
import Alert from '../../common/Alert';
import Button from '../../common/Button';

export const FooterForm = ({
  isSubmitting,
  submitError,
  submitSuccess,
  onSubmit,
  onLoginClick,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className='space-y-4'>
      {/* Alert Messages */}
      {submitError && <Alert type='error' message={submitError} />}
      {submitSuccess && <Alert type='success' message={submitSuccess} />}

      {/* Submit Button */}
      <Button
        type='submit'
        variant='primary'
        size='lg'
        className='w-full'
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        {isSubmitting ? 'Mendaftar...' : 'Daftar'}
      </Button>

      {/* Login Link */}
      <div className='text-center'>
        <span className='text-sm text-gray-600 dark:text-gray-400'>
          Sudah punya akun?{' '}
          <button
            type='button'
            onClick={onLoginClick}
            className={`font-medium ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}
          >
            Masuk
          </button>
        </span>
      </div>
    </div>
  );
};
