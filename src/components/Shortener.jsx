import { useState } from "react"
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";

const apiUrl = "http://localhost:3000";

export default function Shortener(props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  async function handleClick() {
    if (input === "") return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/shorten`,
        { url: input },
        { headers: { "Content-type": "application/json" } }
      );

      if (response.status === 404) {
        alert("Unable to reach server");
        setInput("");
        setLoading(false);
        return;
      }

      const data = response.data;
      console.log("Shortened URL data:", data);
      const newItem = {
        url: input,
        shortUrl: data.shortUrl,
        code: data.code,
      };
      props.addLink(newItem);
      setInput("");
    } catch (err) {
      alert("Server Error");
    }

    setLoading(false);
  }

  const override = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div className="shortener bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto">
      <form className="flex flex-row items-center gap-4 w-full gap-4 lg:gap-6 items-center w-full">
        <div className="flex-1 w-full">
          <input
            type="url"
            placeholder="Shorten a link here..."
            id="input"
            onChange={handleInputChange}
            value={input}
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${input === '' ? 'border-red-500' : ''}`}
            required
          />
          <p className="warning">Please add a link</p>
        </div>

        <button
          className="btn-cta bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700 transition flex justify-center whitespace-nowrap"
          type="button"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? (
            <PulseLoader
              color={"white"}
              cssOverride={override}
              size={11}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Shorten it!"
          )}
        </button>
      </form>
    </div>
  );
}
