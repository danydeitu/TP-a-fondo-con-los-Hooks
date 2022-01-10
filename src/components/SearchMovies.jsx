import React, {useState, useEffect, useRef} from 'react';

function SearchMovies(){
	
	const v_ref = useRef();
	//const keyword = 'PELÍCULA DEMO';

	// Credenciales de API
	const apiKey = '1a99a74'; // Intenta poner cualquier cosa antes para probar
	
	const [movies, setMovies] = useState([]);
	const [keyState, setKeyState] = useState("action");

	const fetchData = async (keyData)=> {
		try {
			
			const response = await fetch(`http://www.omdbapi.com/?s=${keyData}&apikey=${apiKey}`);
			const res = await response.json();
			const data = await res.Search;
			
			setMovies(data);

		} catch (error) {
			console.log(error)
		}
	}

	const keySearch = (e) => {
		console.log(v_ref)
		e.preventDefault();
		setKeyState(v_ref.current.value)

		fetchData(keyState)
	}

	useEffect(()=> {
		console.log("useEffect")
		fetchData(keyState);
	}, [keyState]);

	return(
		<div className="container-fluid">
			{
				apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form onSubmit={keySearch} method="GET">
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={v_ref} type="text" className="form-control" />
								</div>
								<button className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Películas para la palabra: {keyState}</h2>
						</div>
						{/* Listado de películas */}
						{
							movies.length > 0 && movies.map((movie, i) => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={i}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img 
														className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
														src={movie.Poster}
														alt={movie.Title} 
														style={{ width: '90%', height: '400px', objectFit: 'cover' }} 
													/>
												</div>
												<p>{movie.Year}</p>
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{ movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				:
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;