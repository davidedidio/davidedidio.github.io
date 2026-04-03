export default function Redirect({prop}: { prop: string }) {
    window.location.replace(prop);
    return <h5>Redirecting...</h5>;
};