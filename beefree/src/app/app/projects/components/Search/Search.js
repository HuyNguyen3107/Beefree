"use client";
import React from 'react';
import {CiSearch} from "react-icons/ci";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDispatch} from "react-redux";
import {searchSlice} from "@/redux/slice/searchSlice";
import {notifyWarning} from "@/utils/toast";

const {updateSearch} = searchSlice.actions;

function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const [name, setName] = React.useState("");
    return (
        <>
            <div className="flex gap-x-3">
                <div className="border flex items-center px-2 py-2 rounded-sm">
                    <label htmlFor="type" className="font-semibold">
                        Type:
                    </label>
                    <select
                        name="type" id="type" onChange={(e) => {
                        if (e.target.value === "0") {
                            if (searchParams.toString().includes("q") & searchParams.toString().includes("&")) {
                                let arr = searchParams.toString().split("&");
                                arr = arr.filter((item) => !item.includes("q"));
                                router.push(`${pathname + `?${arr[0]}`}`);
                                dispatch(updateSearch(arr[0].slice(1)));
                            } else if (searchParams.toString().includes("q")) {
                                router.push(`${pathname}`);
                                dispatch(updateSearch(" "));
                            }
                            return;
                        }
                        const arr = ["email", "page"];
                        const value = arr[+e.target.value - 1];
                        let query = `?q=${value}`;
                        if (searchParams.toString().includes("q") && searchParams.toString().includes("&")) {
                            let arr = searchParams.toString().split("&");
                            if (arr.length > 1) {
                                arr = arr.filter((item) => !item.includes("q"));
                                query = `?${arr[0]}&q=${value}`;
                            }
                        } else if (searchParams.toString().includes("_sort")) {
                            query = `?_sort=${searchParams.get("_sort")}&q=${value}`;
                        }
                        router.push(`${pathname + query}`);
                        dispatch(updateSearch(query.slice(1)));
                    }}
                    >
                        <option value="0">All</option>
                        <option value="1">Email</option>
                        <option value="2">Page</option>
                    </select>
                </div>
                <div className="flex items-center border flex items-center rounded-sm">
                    <input
                        type="text"
                        placeholder="Search in Your Workspace"
                        className="px-2 py-2"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div
                        className="bg-indigo-300 h-full px-2 py-2 flex items-center justify-center text-indigo-600"
                        onClick={() => {
                            if (name === "") {
                                notifyWarning("Please enter a name project to search");
                                return;
                            }
                            let query = `?q=${name}`;
                            if (searchParams.toString().includes("q") && searchParams.toString().includes("&")) {
                                let arr = searchParams.toString().split("&");
                                if (arr.length > 1) {
                                    arr = arr.filter((item) => !item.includes("q"));
                                    query = `?${arr[0]}&q=${name}`;
                                }
                            } else if (searchParams.toString().includes("_sort")) {
                                query = `?_sort=${searchParams.get("_sort")}&q=${name}`;
                            }
                            router.push(`${pathname + query}`);
                            dispatch(updateSearch(query.slice(1)));
                        }}
                    >
                        <CiSearch className="font-bold text-lg"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;