import FocusTrap from 'focus-trap-react';

type BaseFocusTrapProps = {
  children: (props: {
    onKeyDown: React.DOMAttributes<HTMLElement>['onKeyDown'];
  }) => React.ReactNode;
  onClose: VoidFunction;
};

export default function BaseFocusTrap({
  children,
  onClose,
}: BaseFocusTrapProps) {
  return (
    <FocusTrap
      focusTrapOptions={{
        allowOutsideClick: true,
        // About not using the built-in escape behavior of FocusTrap:
        // https://www.npmjs.com/package/focus-trap-react#%EF%B8%8F%EF%B8%8F-react-18-strict-mode-%EF%B8%8F%EF%B8%8F
        // https://github.com/focus-trap/focus-trap-react/issues/796
        escapeDeactivates: false,
      }}
    >
      {children({
        onKeyDown: (e) => {
          if (e.key === 'Escape') {
            onClose();
          }
        },
      })}
    </FocusTrap>
  );
}
