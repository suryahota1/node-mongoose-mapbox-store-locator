document.getElementById("store-form").addEventListener("submit", async e => {
    e.preventDefault();
    const storeId = document.getElementById("store-id").value;
    const storeAddress = document.getElementById("store-address").value;
    if ( storeId && storeAddress ) {
        const body = {
            storeId,
            address: storeAddress
        };
        try {
            const res = await fetch("/api/v1/stores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            if ( res.status != 201 ) {
                throw Error("Error occured")
            }
            location.href = "/index.html";
        } catch ( e ) {
            alert(e.message);
        }
    }
});
