function LinkCopy(): JSX.Element {
  const copyUrl = () => {
    let url = '';
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('링크가 복사되었습니다');
  };

  return (
    <button type="button" onClick={() => copyUrl()}>
      [링크복사]
    </button>
  );
}

export default LinkCopy;
