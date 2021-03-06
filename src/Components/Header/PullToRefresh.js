export const PullToRefresh = () => {
    let pStart = { x: 0, y: 0 };
    let pStop = { x: 0, y: 0 };

    const swipeStart = (e) => {
        if (typeof e["targetTouches"] !== "undefined") {
            let touch = e.targetTouches[0];
            pStart.x = touch.screenX;
            pStart.y = touch.screenY;
        } else {
            pStart.x = e.screenX;
            pStart.y = e.screenY;
        }
    }

    const swipeEnd = (e) => {
        if (typeof e["changedTouches"] !== "undefined") {
            let touch = e.changedTouches[0];
            pStop.x = touch.screenX;
            pStop.y = touch.screenY;
        } else {
            pStop.x = e.screenX;
            pStop.y = e.screenY;
        }

        swipeCheck();
    }

    const swipeCheck = () => {
        let changeY = pStart.y - pStop.y;
        let changeX = pStart.x - pStop.x;
        if (isPullDown(changeY, changeX)) {
            window.location.reload();
        }
    }

    const isPullDown = (dY, dX) => {
        // methods of checking slope, length, direction of line created by swipe action
        return (
            dY < 0 &&
            ((Math.abs(dX) <= 100 && Math.abs(dY) >= 300) ||
            (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60))
        );
    }

    document.addEventListener(
        "touchstart",
        function (e) {
            swipeStart(e);
        },
        false
        );
        document.addEventListener(
        "touchend",
        function (e) {
            swipeEnd(e);
        },
        false
    );


    return null;
}