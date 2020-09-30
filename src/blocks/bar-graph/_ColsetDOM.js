export default ({ colset }) => {
	return (
		<span className='pb-bar-graph' data-colset={colset} data-bg='1'>
			<span className='pb-bar-graph__dl' data-bg='1'>
				<span className='pb-bar-graph__item'>
					<span className='pb-bar-graph__dt'>
						<span className='pb-bar-graph__fill'></span>
					</span>
					<span className='pb-bar-graph__dd'></span>
				</span>
				<span className='pb-bar-graph__item'>
					<span className='pb-bar-graph__dt'>
						<span className='pb-bar-graph__fill'></span>
					</span>
					<span className='pb-bar-graph__dd'></span>
				</span>
			</span>
		</span>
	);
};
