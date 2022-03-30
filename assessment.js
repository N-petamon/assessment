'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
     assessmentButton.onclick();
	}
};

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // ���O����̎��͏������I������
    return;
  }

  // �f�f���ʕ\���G���A�̍쐬
  resultDivided.innerText = "";
  const header = document.createElement('h3');
  header.innerText = '�f�f����';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // �c�C�[�g�G���A�̍쐬
  tweetDivided.innerText = "";
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('���Ȃ��̂����Ƃ���') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #���Ȃ��̂����Ƃ���';
  tweetDivided.appendChild(anchor);

  // widgets.js �̐ݒ�
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

const answers = [
  '{userName}�̂����Ƃ���͐��ł��B{userName}�̓����I�Ȑ��݂͂Ȃ��䂫���A�S�Ɏc��܂��B',
  '{userName}�̂����Ƃ���͂܂Ȃ����ł��B{userName}�Ɍ��߂�ꂽ�l�́A�C�ɂȂ��Ďd�����Ȃ��ł��傤�B',
  '{userName}�̂����Ƃ���͏�M�ł��B{userName}�̏�M�Ɏ���̐l�͊�������܂��B',
  '{userName}�̂����Ƃ���͌������ł��B{userName}�̌����������̂��Ƃ����������ɓ����܂��B',
  '{userName}�̂����Ƃ���͒m���ł��B������{userName}�𑽂��̐l������ɂ��Ă��܂��B',
  '{userName}�̂����Ƃ���̓��j�[�N���ł��B{userName}�����̂��̓������F���y���������܂��B',
  '{userName}�̂����Ƃ���͗p�S�[���ł��B{userName}�̓��@�ɁA�����̐l���������܂��B',
  '{userName}�̂����Ƃ���͌����ڂł��B����������o��{userName}�̗ǂ��ɊF���C���䂩��܂��B',
  '{userName}�̂����Ƃ���͌��f�͂ł��B{userName}�����錈�f�ɂ�����������l�����܂��B',
  '{userName}�̂����Ƃ���͎v�����ł��B{userName}�ɋC�������Ă�����������̐l�����ӂ��Ă��܂��B',
  '{userName}�̂����Ƃ���͊��󐫂ł��B{userName}�����������ƂɊF���������A�킩�肠�����Ƃ��ł��܂��B',
  '{userName}�̂����Ƃ���͐ߓx�ł��B���������Ȃ�{userName}�̍l���ɊF�����ӂ��Ă��܂��B',
  '{userName}�̂����Ƃ���͍D��S�ł��B�V�������ƂɌ������Ă���{userName}�̐S�\���������̐l�ɖ��͓I�ɉf��܂��B',
  '{userName}�̂����Ƃ���͋C�z��ł��B{userName}�̔z���������̐l���~���Ă��܂��B',
  '{userName}�̂����Ƃ���͂��̑S�Ăł��B����̂܂܂�{userName}���g�������Ƃ���Ȃ̂ł��B',
  '{userName}�̂����Ƃ���͎����S�ł��B��΂��Ǝv�����Ƃ��ɂ�������ƏՓ���}������{userName}���F����]������Ă��܂��B'
];

/**
 * ���O�̕������n���Ɛf�f���ʂ�Ԃ��֐�
 * @param {string} userName ���[�U�[�̖��O
 * @return {string} �f�f����
 */
function assessment(userName) {
  // �S�����̃R�[�h�ԍ����擾���Ă���𑫂����킹��
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // �����̃R�[�h�ԍ��̍��v���񓚂̐��Ŋ����ēY���̐��l�����߂�
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('{userName}', userName);
  return result;
}

// �e�X�g�R�[�h
console.assert(
  assessment('���Y') ===
    '���Y�̂����Ƃ���͌��f�͂ł��B���Y�����錈�f�ɂ�����������l�����܂��B',
  '�f�f���ʂ̕����̓���̕����𖼑O�ɒu�������鏈��������������܂���B'
);
console.assert(
  assessment('���Y') === assessment('���Y'),
  '���͂��������O�Ȃ瓯���f�f���ʂ��o�͂��鏈��������������܂���B'
);