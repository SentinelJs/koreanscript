class KoreanScript {
    constructor() {

    }

    compile(source) {
        const closedCheckStack = [];
        const chars = {
            "ㅑ": "ㅕ",
            "ㅏ": "ㅓ"
        }

        for (let word of source.split('')) {
            if (!"ㅑㅕㅏㅓ".includes(word)) continue;
            // 여닫이 제외 막기

            if ("ㅓㅕ".includes(word)) {
                closedCheckStack.push(word)
            } else {
                const lastWord = closedCheckStack[closedCheckStack.length - 1];

                if (lastWord == chars[word]) closedCheckStack.pop()
                // 열고 닫히는게 연속됬다면 스택에서 삭제.
                else if (lastWord !== chars[word]) 
                    throw new Error(`${lastWord ?? word}가 안 ${lastWord ? "닫혔어요 !" : "열렸어요 !"}`)
                // 스택 마지막 글자와 현재 글자가 여닫는게 다르다면 오류 발생.
            }
        }

        if (closedCheckStack[0]) {
            throw new Error(`${closedCheckStack[0]}가 안 닫혔어요 !`)
            // 스택이 남아있다면 오류 발생
        }

        const sourceSplit = source.split('')
    }
}

const ks = new KoreanScript()
ks.compile("ㅓ")
